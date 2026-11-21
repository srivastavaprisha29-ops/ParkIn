const samples = [
  { name: "Metro-side covered bay", area: "Indiranagar", vehicle: "Car", price: 50 },
  { name: "Market side parking", area: "Koramangala", vehicle: "Two-wheeler", price: 20 },
  { name: "Office district bay", area: "Whitefield", vehicle: "Car", price: 70 },
];

const storageKey = "parkin.listings.v1";
const hourMs = 3600000;
const istOffsetMs = 330 * 60000;
const dateTime = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short",
});
const reservationKey = "parkin.reservations.v1";
const reservation = document.querySelector("#reservation");
const reservationCards = document.querySelector("#reservations");
const reservationFeedback = document.querySelector("#reservation-feedback");
const quote = document.querySelector("#quote");
let selectedSpot = null;
const filters = document.querySelector("#filters");
const listing = document.querySelector("#listing");
const results = document.querySelector("#results");
const count = document.querySelector("#count");
const feedback = document.querySelector("#feedback");
const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function isValidSpot(spot) {
  return Boolean(spot && typeof spot.name === "string" && spot.name.trim()
    && typeof spot.area === "string" && spot.area.trim()
    && ["Car", "Two-wheeler"].includes(spot.vehicle)
    && Number.isInteger(spot.price) && spot.price >= 0 && spot.price <= 10000);
}

function loadEntries(key, isValid) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(saved) ? saved.filter(isValid) : [];
  } catch {
    return [];
  }
}

function loadListings() {
  return loadEntries(storageKey, isValidSpot);
}

function loadReservations() {
  return loadEntries(reservationKey, entry =>
    entry && isValidSpot(entry.spot) && [1, 2, 3, 4].includes(entry.hours)
  );
}

function istInput(timestamp) {
  return new Date(timestamp + istOffsetMs).toISOString().slice(0, 16);
}

function parseArrival(value) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return NaN;
  const timestamp = Date.parse(value + ":00+05:30");
  return Number.isFinite(timestamp) && istInput(timestamp) === value ? timestamp : NaN;
}

function spotKey(spot) {
  return spot.id || JSON.stringify([spot.name, spot.area, spot.vehicle, spot.price]);
}

function hasOverlap(entries, spot, start, hours) {
  return entries.some(entry => spotKey(entry.spot) === spotKey(spot)
    && start < entry.start + entry.hours * hourMs
    && entry.start < start + hours * hourMs);
}

function updateSavedReservations(update) {
  if (navigator.locks) return navigator.locks.request(reservationKey, update);
  return Promise.resolve().then(update);
}

function reservationHours() {
  return Number(new FormData(reservation).get("hours"));
}

function updateQuote() {
  quote.textContent = "Estimated total: " + money.format(selectedSpot.price * reservationHours());
}

function selectSpot(spot, slot) {
  selectedSpot = spot;
  reservation.reset();
  const title = document.querySelector("#selected-spot");
  title.textContent = spot.name + " · " + spot.area;
  reservationFeedback.textContent = "";
  reservation.hidden = false;
  const arrival = reservation.elements.namedItem("arrival");
  const interval = 15 * 60000;
  arrival.min = istInput(Math.ceil((Date.now() + 1) / 60000) * 60000);
  arrival.value = slot ? istInput(slot.start) : istInput(Math.ceil((Date.now() + 1) / interval) * interval);
  if (slot) reservation.elements.namedItem("hours").value = String(slot.hours);
  updateQuote();
  document.querySelector("#reserve").scrollIntoView({ block: "start" });
  arrival.focus({ preventScroll: true });
}

function renderReservations() {
  const entries = loadReservations().map(({ spot, hours, start, id }) => {
    const card = document.createElement("article");
    const title = document.createElement("h3");
    const detail = document.createElement("p");
    title.textContent = spot.name;
    detail.textContent = spot.area + " · " + hours + (hours === 1 ? " hour" : " hours")
      + " · " + money.format(spot.price * hours);
    const timing = document.createElement("p");
    timing.textContent = Number.isFinite(start)
      ? dateTime.format(start) + " to " + dateTime.format(start + hours * hourMs) + " IST"
      : "Saved before scheduling was available";
    card.append(title, detail, timing);
    if (id && start >= Date.now()) {
      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.textContent = "Cancel reservation";
      cancel.setAttribute("aria-label", "Cancel reservation for " + spot.name + " at " + dateTime.format(start));
      cancel.addEventListener("click", () => cancelReservation(id));
      card.append(cancel);
    }
    return card;
  });
  reservationCards.replaceChildren(...entries);
}

async function cancelReservation(id) {
  try {
    await updateSavedReservations(() => {
      const entries = loadReservations();
      localStorage.setItem(reservationKey, JSON.stringify(entries.filter(entry => entry.id !== id)));
    });
    renderReservations();
    if (filters.elements.namedItem("arrival").value) render();
    announceReservation("Demo reservation cancelled.");
  } catch {
    announceReservation("Your browser could not cancel this reservation.");
  }
}

function announceReservation(message) {
  reservationFeedback.textContent = message;
  reservationFeedback.tabIndex = -1;
  reservationFeedback.focus();
}

function makeCard(spot, source, slot) {
  const card = document.createElement("article");
  const title = document.createElement("h3");
  const detail = document.createElement("p");
  const rate = document.createElement("strong");
  const label = document.createElement("p");
  title.textContent = spot.name;
  detail.textContent = spot.area + " · " + spot.vehicle;
  rate.textContent = money.format(spot.price) + " / hour";
  label.textContent = source;
  const reserve = document.createElement("button");
  reserve.type = "button";
  reserve.textContent = "Reserve (demo)";
  reserve.setAttribute("aria-label", "Reserve " + spot.name + " (demo)");
  reserve.addEventListener("click", () => selectSpot(spot, slot));
  card.append(title, detail, rate, label, reserve);
  return card;
}

function render() {
  const values = new FormData(filters);
  const query = values.get("query").trim().toLowerCase();
  const vehicle = values.get("vehicle");
  const max = values.get("max");
  const arrivalInput = filters.elements.namedItem("arrival");
  const arrival = values.get("arrival");
  const start = parseArrival(arrival);
  const hours = Number(values.get("hours"));
  if (arrivalInput.validity.badInput || (arrival && (!Number.isFinite(start) || start <= Date.now()))) {
    results.replaceChildren();
    count.textContent = "Choose a future arrival in Bengaluru, or clear the arrival to browse all spots.";
    return;
  }
  const slot = arrival ? { start, hours } : null;
  const bookings = slot ? loadReservations() : [];
  const entries = [
    ...loadListings().map(spot => ({ spot, source: "Saved on this device" })),
    ...samples.map(spot => ({ spot, source: "Sample listing" })),
  ];
  const matches = entries.filter(({ spot }) =>
    (spot.name + " " + spot.area).toLowerCase().includes(query)
    && (!vehicle || spot.vehicle === vehicle)
    && (max === "" || spot.price <= Number(max))
    && (!slot || !hasOverlap(bookings, spot, slot.start, slot.hours))
  );
  results.replaceChildren(...matches.map(({ spot, source }) => makeCard(spot, source, slot)));
  count.textContent = matches.length
    ? matches.length + (matches.length === 1 ? " spot" : " spots") + (slot ? " available" : " found")
    : slot ? "No spots match your filters for this time." : "No spots match your filters."
}

filters.addEventListener("input", render);
filters.addEventListener("submit", event => event.preventDefault());
listing.addEventListener("submit", event => {
  event.preventDefault();
  const values = new FormData(listing);
  const spot = {
    id: crypto.randomUUID(),
    name: values.get("name").trim(),
    area: values.get("area").trim(),
    vehicle: values.get("vehicle"),
    price: Number(values.get("price")),
  };
  if (!isValidSpot(spot)) {
    feedback.textContent = "Enter a listing name, neighbourhood and valid hourly rate.";
    return;
  }
  try {
    localStorage.setItem(storageKey, JSON.stringify([spot, ...loadListings()]));
  } catch {
    feedback.textContent = "Your browser could not save this listing.";
    return;
  }
  listing.reset();
  filters.reset();
  render();
  feedback.textContent = "Listing saved. You can find it in Browse parking above.";
});
reservation.addEventListener("change", updateQuote);
reservation.addEventListener("submit", async event => {
  event.preventDefault();
  const spot = selectedSpot;
  const hours = reservationHours();
  const start = parseArrival(reservation.elements.namedItem("arrival").value);
  if (!spot || ![1, 2, 3, 4].includes(hours)) return;
  const submit = reservation.querySelector("button");
  submit.disabled = true;
  try {
    const message = await updateSavedReservations(() => {
      if (!Number.isFinite(start) || start <= Date.now()) return "Choose a future arrival time in Bengaluru.";
      const entries = loadReservations();
      if (hasOverlap(entries, spot, start, hours)) return "You already have an overlapping demo reservation for this spot.";
      localStorage.setItem(reservationKey, JSON.stringify([{ id: crypto.randomUUID(), spot, hours, start }, ...entries]));
      return null;
    });
    if (message) {
      announceReservation(message);
      return;
    }
    if (selectedSpot === spot) {
      selectedSpot = null;
      reservation.hidden = true;
    }
    renderReservations();
    if (filters.elements.namedItem("arrival").value) render();
    announceReservation("Demo reservation saved on this device.");
  } catch {
    announceReservation("Your browser could not save this reservation.");
  } finally {
    submit.disabled = false;
  }
});
window.addEventListener("storage", event => {
  if (event.key === storageKey || event.key === reservationKey || event.key === null) render();
  if (event.key === reservationKey || event.key === null) renderReservations();
});
render();
renderReservations();
