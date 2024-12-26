const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { capitalize } = require('./common.steps');

Then('I verify that categories are visible on left side bar', async function () {
  const categoriesSidebar = await this.page.locator('.left-sidebar');
  await expect(categoriesSidebar).toBeVisible();
});

When("I click on {string} category", async function (categoryName) {
  const capitalizedCategoryName = capitalize(categoryName);
  const categoryLink = this.page.locator(`a[href="#${capitalizedCategoryName}"]`);
  await categoryLink.scrollIntoViewIfNeeded();
  await categoryLink.waitFor({ state: 'visible', timeout: 30000 });
  await categoryLink.click();
});

When("I click on subcategory link under category with index {string}", async function (index) {
  const subCategoryLink = this.page.locator(`a[href="/category_products/${index}"]`);
  await subCategoryLink.scrollIntoViewIfNeeded();
  await subCategoryLink.waitFor({ state: 'visible', timeout: 30000 });
  await subCategoryLink.click();
});

Then("I verify that category page is displayed and confirm text {string} - {string} Products with {string} is displayed", async function (categoryName, subCategoryName, index) {
  const categoryTitle = await this.page.locator('h2.title.text-center');
  await expect(categoryTitle).toContainText(`${categoryName} - ${subCategoryName} Products`);
  expect(this.page.url()).toBe(`https://automationexercise.com/category_products/${index}`);
});