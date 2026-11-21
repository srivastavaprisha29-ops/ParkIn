const { test, expect } = require("@playwright/test");

test("a demo booking changes availability and cancellation restores it", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.clock.setFixedTime(new Date("2028-01-01T03:30:00Z"));
  await page.goto("http://127.0.0.1:8000");

  const filters = page.locator("#filters");
  const reservation = page.locator("#reservation");
  const count = page.locator("#count");
  const slot = "2028-01-01T10:00";
  await filters.getByLabel("Neighbourhood or listing").fill("Indiranagar");
  await filters.getByLabel("Filter by arrival (IST)").fill(slot);
  await filters.getByLabel("Parking duration").selectOption("2");
  await expect(count).toHaveText("1 spot available");

  await page.getByRole("button", { name: "Reserve Metro-side covered bay (demo)" }).click();
  await expect(reservation.getByLabel("Arrival time (Bengaluru, IST)")).toHaveValue(slot);
  await expect(reservation.getByLabel("Duration")).toHaveValue("2");
  await expect(page.locator("#quote")).toContainText("₹100");
  await reservation.getByRole("button", { name: "Confirm demo reservation" }).click();
  await expect(count).toHaveText("No spots match your filters for this time.");

  await page.reload();
  const saved = page.locator("#reservations");
  await expect(saved.getByRole("heading", { name: "Metro-side covered bay" })).toBeVisible();
  await filters.getByLabel("Neighbourhood or listing").fill("Indiranagar");
  await filters.getByLabel("Filter by arrival (IST)").fill(slot);
  await expect(count).toHaveText("No spots match your filters for this time.");
  await saved.getByRole("button", { name: /Cancel reservation for Metro-side covered bay/ }).click();
  await expect(count).toHaveText("1 spot available");
  expect(errors).toEqual([]);
});

test("a host can add a spot on a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:8000");
  const listing = page.locator("#listing");
  await listing.getByLabel("Listing name").fill("HSR Test Bay");
  await listing.getByLabel("Neighbourhood").fill("HSR Layout");
  await listing.getByLabel("Hourly rate (₹)").fill("0");
  await listing.getByRole("button", { name: "Add listing" }).click();
  await page.reload();
  await expect(page.locator("#results").getByRole("heading", { name: "HSR Test Bay" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test("checkout explains an overlap and accepts a back-to-back slot", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2028-01-01T03:30:00Z"));
  await page.goto("http://127.0.0.1:8000");
  const reserve = page.getByRole("button", { name: "Reserve Metro-side covered bay (demo)" });
  const form = page.locator("#reservation");
  const arrival = form.getByLabel("Arrival time (Bengaluru, IST)");
  const confirm = form.getByRole("button", { name: "Confirm demo reservation" });
  await reserve.click();
  await arrival.fill("2028-01-01T10:00");
  await confirm.click();
  await expect(form).toBeHidden();

  await reserve.click();
  await arrival.fill("2028-01-01T10:30");
  await expect(page.locator("#slot-status")).toContainText("overlaps");
  await expect(confirm).toBeDisabled();
  await arrival.fill("2028-01-01T11:00");
  await expect(page.locator("#slot-status")).toContainText(/Available in this demo until.*IST/);
  await expect(confirm).toBeEnabled();
  await confirm.click();
  await expect(page.locator("#reservations article")).toHaveCount(2);
});
