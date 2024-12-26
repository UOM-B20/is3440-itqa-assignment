const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Then("I should see a list of products", async function () {
  const productList = await this.page.locator('.features_items');
  await expect(productList).toBeVisible();
});

When("I click on the View Product button for the first product", async function () {
  const viewProductButton = await this.page.locator('a[href="/product_details/1"]');
  await viewProductButton.click();
  expect(this.page.url()).toContain('/product_details/1');
});

Then("I should see the product details displayed", async function () {
  const productDetails = await this.page.locator('.product-details');
  await expect(productDetails).toBeVisible();
  expect(this.page.url()).toBe('https://automationexercise.com/product_details/1');
});