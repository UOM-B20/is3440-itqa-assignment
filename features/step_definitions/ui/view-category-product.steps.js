const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");


Then('I verify that categories are visible on left side bar', async function () {
  const categoriesSidebar = await this.page.locator('.left-sidebar');
  await expect(categoriesSidebar).toBeVisible();
});

When("I click on Women category", async function () {
  const womenCategory = await this.page.locator('a[href="#Women"]');
  await womenCategory.click();
});

When("I click on Dress category link under Women category", async function () {
  const dressCategoryLink = await this.page.locator('a[href="/category_products/1"]');
  await dressCategoryLink.click();
});

Then("I verify that category page is displayed and confirm text Women - Dress Products", async function () {
  const categoryTitle = await this.page.locator('h2.title.text-center');
  await expect(categoryTitle).toContainText('Women - Dress Products');
  expect(this.page.url()).toBe('https://automationexercise.com/category_products/1');
});

When("I click on Men category", async function () {
  const menCategory = await this.page.locator('a[href="#Men"]');
  await menCategory.click();
});

When("I click on TSHIRTS sub-category link of MEN category", async function () {
  const menTshirtsLink = await this.page.locator('a[href="/category_products/3"]');
  await menTshirtsLink.click();
});

Then("I verify that user is navigated to TSHIRTS category page", async function () {
  const categoryTitle = await this.page.locator('h2.title.text-center');
  await expect(categoryTitle).toContainText('Men - Tshirts Products');
  expect(this.page.url()).toBe('https://automationexercise.com/category_products/3');
});