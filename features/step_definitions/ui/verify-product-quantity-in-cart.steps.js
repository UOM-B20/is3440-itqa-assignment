const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I navigate to the home page", async function () {
  await this.page.goto("http://automationexercise.com");
});

When("I click the Products button", async function () {
  await this.page.click('a[href="/products"]');
});

When("I add the first product to the cart", async function () {
  await this.page.click('a[data-product-id="1"]');
});

When("I click View Cart", async function () {
  await this.page.click('a[href="/view_cart"]');
});

Then("I should see the quantity of the product as {string}", async function (expectedQuantity) {
  const quantity = await this.page.locator(".cart_quantity button").innerText();
  expect(quantity).toBe(expectedQuantity);
});
