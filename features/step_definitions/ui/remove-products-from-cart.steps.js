const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");


When("I click on Products button", async function () {
  await this.page.click('a[href="/products"]');
});

When("I add the first product to the cart", async function () {
  await this.page.click('a[data-product-id="1"]');
});

When("I click View Cart", async function () {
  await this.page.click('a[href="/view_cart"]');
});

When("I click the delete button for the product", async function () {
  await this.page.click('a.cart_quantity_delete[data-product-id="1"]');
});

Then("I should see the cart is empty", async function () {
  const cartEmptyMessage = await this.page.locator(".cart_empty_message").innerText();
  expect(cartEmptyMessage).toContain("Your cart is empty!"); // Replace with actual cart empty text//
});

Then("I should see the quantity of the product as {string}", async function (expectedQuantity) {
  const quantity = await this.page.locator(".cart_quantity button").innerText();
  expect(quantity).toBe(expectedQuantity);
});
