const { When, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const UIUtils = require("../../support/ui-utils");

Given("I navigate to the URL {string}", async function (url) {
  await this.page.goto(url, { timeout: 60000 }); // Increase timeout to 60 seconds
});

Given("I am on the home page", async function () {
  expect(this.page.url()).toBe("https://automationexercise.com/");
});

When("I click the Products button", async function () {
  const productBtn = await this.page.locator(
    "li:has(i.material-icons.card_travel)"
  );
  await expect(productBtn).toContainText("Products");
  await productBtn.click();
  expect(this.page.url()).toContain("/products");
});

When("I navigate to {string} page", async function (pageName) {
  const selector = {
    Products: "li:has(i.material-icons.card_travel)",
    Cart: "li:has(i.material-icons.shopping_cart)",
  };

  const pageSelector = selector[UIUtils.capitalize(pageName)];

  if (!pageSelector) {
    throw new Error(
      `Invalid page name: ${pageName}, If it is new page, please add it to the selector object`
    );
  }

  const button = await this.page.locator(pageSelector);
  await expect(button).toContainText(pageName);
  await button.click();
  expect(this.page.url()).toContain(`/${pageName.toLowerCase()}`);
});

async function viewProductDetailsForEachProduct(page) {
  const productCount = await page
    .locator(".features_items .product-image-wrapper")
    .count();
  for (let i = 1; i <= productCount; i++) {
    const viewProductButton = await page.locator(
      `a[href="/product_details/${i}"]`
    );
    await viewProductButton.click();
    expect(page.url()).toContain(`/product_details/${i}`);
    // Navigate back to the products page to continue the loop
    await page.goBack();
  }
}

module.exports = { viewProductDetailsForEachProduct };
