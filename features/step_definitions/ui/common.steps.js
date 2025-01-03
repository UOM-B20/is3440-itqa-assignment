const { When, Given, Then } = require("@cucumber/cucumber");
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

When("I click the Cart button", async function () {
  const cartBtn = await this.page.locator("li:has(a i.fa.fa-shopping-cart)");
  await expect(cartBtn).toContainText("Cart");
  await cartBtn.click();
  expect(this.page.url()).toContain("/view_cart");
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

Then(
  "I verify that {string} section are visible on left side bar",
  async function (section) {
    // Verify sidebar container
    const sidebar = await this.page.locator(".left-sidebar");
    await expect(sidebar).toBeVisible();

    // Verify section header
    const sectionHeader = sidebar.locator("h2", { hasText: section });
    await expect(sectionHeader).toBeVisible();

    // Verify content based on section type
    if (section.toLowerCase() === "category") {
      const categoryContainer = sidebar.locator(".category-products");
      await expect(categoryContainer).toBeVisible();

      // Verify at least one category exists
      const categories = await sidebar.locator(".panel-default").all();
      expect(categories.length).toBeGreaterThan(0, "No categories found");
    } else if (section.toLowerCase() === "brands") {
      const brandsContainer = sidebar.locator(".brands-name");
      await expect(brandsContainer).toBeVisible();

      // Verify at least one brand exists
      const brands = await sidebar.locator(".brands-name li").all();
      expect(brands.length).toBeGreaterThan(0, "No brands found");
    }
  }
);

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
