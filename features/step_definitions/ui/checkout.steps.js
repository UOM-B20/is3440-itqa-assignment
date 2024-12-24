const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I have products in my cart", async function () {
  await this.page.goto("http://automationexercise.com");
  await this.page.locator("li:has(i.material-icons.card_travel)").click();
  await this.page.hover('a[data-product-id="1"]');
  await this.page.click('a[data-product-id="1"].add-to-cart');
  await this.page.locator('button.btn-success[data-dismiss="modal"]').click();
  await this.page.hover('a[data-product-id="2"]');
  await this.page.click('a[data-product-id="2"].add-to-cart');
  await this.page.locator('.modal-body a[href="/view_cart"]').click();
});

When("I click proceed to checkout", async function () {
  // 1. Find button and ensure it's ready
  const checkoutBtn = await this.page.locator("a.btn.btn-default.check_out");
  await checkoutBtn.waitFor({ state: "visible" });

  // 2. Set up navigation promise BEFORE clicking
  await Promise.all([this.page.waitForNavigation(), checkoutBtn.click()]);

  // 3. Navigation is now complete, safe to check URL
  expect(this.page.url()).toContain("/checkout");
});

Then("I verify cart items and total", async function () {
  // Get product totals
  const product1Total = await this.page
    .locator("#product-1 .cart_total_price")
    .textContent();
  const product2Total = await this.page
    .locator("#product-2 .cart_total_price")
    .textContent();

  // Get final total
  const finalTotal = await this.page
    .locator("tr:last-child .cart_total_price")
    .textContent();

  // Extract amounts and verify sum
  const p1Amount = parseInt(product1Total.replace("Rs. ", ""));
  const p2Amount = parseInt(product2Total.replace("Rs. ", ""));
  const total = parseInt(finalTotal.replace("Rs. ", ""));

  expect(p1Amount + p2Amount).toBe(total);
});

When("I place the order", async function () {
  const placeOrderBtn = await this.page.locator('a.check_out[href="/payment"]');
  await placeOrderBtn.click();
  expect(this.page.url()).toContain("/payment");
});

When("I fill payment details:", async function (dataTable) {
  const cardDetails = dataTable.rowsHash();

  await this.page.locator('[data-qa="name-on-card"]').fill(cardDetails["name"]);
  await this.page
    .locator('[data-qa="card-number"]')
    .fill(cardDetails["card number"]);
  await this.page.locator('[data-qa="cvc"]').fill(cardDetails["cvc"]);
  await this.page
    .locator('[data-qa="expiry-month"]')
    .fill(cardDetails["expiry month"]);
  await this.page
    .locator('[data-qa="expiry-year"]')
    .fill(cardDetails["expiry year"]);
});

When("I confirm payment", async function () {
  await this.page.locator('[data-qa="pay-button"]').click();
});

Then("I should see order confirmation", async function () {
  // Wait for redirect and verify URL contains payment_done
  await this.page.waitForURL(/.*\/payment_done\/\d+/);

  // Verify success message
  const orderPlaced = await this.page.locator('[data-qa="order-placed"]');
  await expect(orderPlaced).toBeVisible();
  await expect(orderPlaced).toContainText("Order Placed!");

  // Optional: Verify invoice download button exists
  const invoiceButton = await this.page.locator(
    'a.btn.check_out:has-text("Download Invoice")'
  );
  await expect(invoiceButton).toBeVisible();

  // Optional: Verify continue button exists
  const continueButton = await this.page.locator('[data-qa="continue-button"]');
  await expect(continueButton).toBeVisible();
});
