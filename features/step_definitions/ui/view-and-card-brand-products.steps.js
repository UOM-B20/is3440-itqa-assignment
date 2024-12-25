const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Then("I verify that Brands are visible on left side bar", async function () {
  const brandsSidebar = await this.page.locator('.brands_products');
  await expect(brandsSidebar).toBeVisible();
});

When("I click on MADAME brand link", async function () {
  const brandLink = await this.page.locator('a[href="/brand_products/Madame"]');
  await brandLink.click();
});

Then("I verify that user is navigated to brand page and brand products are displayed", async function () {
  const brandTitle = await this.page.locator('h2.title.text-center');
  await expect(brandTitle).toContainText('Brand - Madame Products');
  expect(this.page.url()).toBe('https://automationexercise.com/brand_products/Madame');
});

When("I click on BIBA brand link", async function () {
  const bibaBrandLink = await this.page.locator('a[href="/brand_products/Biba"]');
  await bibaBrandLink.click();
});

Then("I verify that user is navigated to that brand page and can see products", async function () {
  const brandTitle = await this.page.locator('h2.title.text-center');
  await expect(brandTitle).toContainText('Brand - Biba Products');
  expect(this.page.url()).toBe('https://automationexercise.com/brand_products/Biba');
});