const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I navigate to the home page", async function () {
  await this.page.goto("http://automationexercise.com");
});

When("I click the Products button", async function () {
  await this.page.click('a[href="/products"]');
  // Wait for the products page to load
  await this.page.waitForSelector('a[data-product-id="1"]');
});

When("I add the first product into the cart", async function () {
  await this.page.click('a[data-product-id="1"]');
  // Optional: Wait for confirmation modal or toast
  await this.page.waitForTimeout(60000);
});

When("I add the second product into the cart", async function () {
  await this.page.click('a[data-product-id="1"]');
  // Optional: Wait for confirmation modal or toast
  await this.page.waitForTimeout(60000);
});

When("I click to View Cart", async function () {
  await this.page.click('a[href="/view_cart"]');
  // Wait for the cart page to load
  await this.page.waitForSelector('tr#product-1');
});

Then("I should see the product quantity as {string}", async function (quantity) {
  // Wait for the quantity button to be available
  await this.page.waitForSelector('tr#product-1 td.cart_quantity button.disabled', { timeout: 60000 });
    
  // Get the text content of the quantity button
  const actualQuantity = await this.page.locator('tr#product-1 td.cart_quantity button.disabled').textContent();
  
  // Log for debugging
  console.log(`Expected quantity: ${quantity}, Actual quantity: ${actualQuantity.trim()}`);
  
  // Assert that the actual quantity matches the expected quantity
  expect(actualQuantity.trim()).toBe(quantity);
});






// const { Given, When, Then } = require("@cucumber/cucumber");
// const { expect } = require("@playwright/test");

// Given("I navigate to the home page", async function () {
//   await this.page.goto("http://automationexercise.com");
// });

// When("I click the Products button", async function () {
//   await this.page.click('a[href="/products"]');
// });

// When("I add the first product to the cart", async function () {
//   await this.page.click('a[data-product-id="1"]');
// });

// When("I click View Cart", async function () {
//   await this.page.click('a[href="/view_cart"]');
// });

// Then("I should see the quantity of the product as {string}", async function (expectedQuantity) {
//   const quantity = await this.page.locator(".cart_quantity button").innerText();
//   expect(quantity).toBe(expectedQuantity);
// });
