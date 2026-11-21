const samples = [
  { name: "Metro-side covered bay", area: "Indiranagar", vehicle: "Car", price: 50 },
  { name: "Market side parking", area: "Koramangala", vehicle: "Two-wheeler", price: 20 },
  { name: "Office district bay", area: "Whitefield", vehicle: "Car", price: 70 },
];

const storageKey = "parkin.listings.v1";
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

function reservationHours() {
  return Number(new FormData(reservation).get("hours"));
}

function updateQuote() {
  quote.textContent = "Estimated total: " + money.format(selectedSpot.price * reservationHours());
}

function selectSpot(spot) {
  selectedSpot = spot;
  reservation.reset();
  const title = document.querySelector("#selected-spot");
  title.textContent = spot.name + " · " + spot.area;
  reservationFeedback.textContent = "";
  reservation.hidden = false;
  updateQuote();
  document.querySelector("#reserve").scrollIntoView({ block: "start" });
  reservation.elements.namedItem("hours").focus({ preventScroll: true });
}

function renderReservations() {
  const entries = loadReservations().map(({ spot, hours }) => {
    const card = document.createElement("article");
    const title = document.createElement("h3");
    const detail = document.createElement("p");
    title.textContent = spot.name;
    detail.textContent = spot.area + " · " + hours + (hours === 1 ? " hour" : " hours")
      + " · " + money.format(spot.price * hours);
    card.append(title, detail);
    return card;
  });
  reservationCards.replaceChildren(...entries);
}

function makeCard(spot, source) {
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
  reserve.addEventListener("click", () => selectSpot(spot));
  card.append(title, detail, rate, label, reserve);
  return card;
}

function render() {
  const values = new FormData(filters);
  const query = values.get("query").trim().toLowerCase();
  const vehicle = values.get("vehicle");
  const max = values.get("max");
  const entries = [
    ...loadListings().map(spot => ({ spot, source: "Saved on this device" })),
    ...samples.map(spot => ({ spot, source: "Sample listing" })),
  ];
  const matches = entries.filter(({ spot }) =>
    (spot.name + " " + spot.area).toLowerCase().includes(query)
    && (!vehicle || spot.vehicle === vehicle)
    && (max === "" || spot.price <= Number(max))
  );
  results.replaceChildren(...matches.map(({ spot, source }) => makeCard(spot, source)));
  count.textContent = matches.length
    ? matches.length + (matches.length === 1 ? " spot found" : " spots found")
    : "No spots match your filters.";
}

filters.addEventListener("input", render);
filters.addEventListener("submit", event => event.preventDefault());
listing.addEventListener("submit", event => {
  event.preventDefault();
  const values = new FormData(listing);
  const spot = {
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
reservation.addEventListener("submit", event => {
  event.preventDefault();
  const hours = reservationHours();
  if (!selectedSpot || ![1, 2, 3, 4].includes(hours)) return;
  try {
    const entries = [{ spot: selectedSpot, hours }, ...loadReservations()];
    localStorage.setItem(reservationKey, JSON.stringify(entries));
  } catch {
    reservationFeedback.textContent = "Your browser could not save this reservation.";
    return;
  }
  selectedSpot = null;
  reservation.hidden = true;
  renderReservations();
  reservationFeedback.textContent = "Demo reservation saved on this device.";
  reservationFeedback.tabIndex = -1;
  reservationFeedback.focus();
});
window.addEventListener("storage", event => {
  if (event.key === storageKey || event.key === null) render();
  if (event.key === reservationKey || event.key === null) renderReservations();
});
render();
renderReservations();
