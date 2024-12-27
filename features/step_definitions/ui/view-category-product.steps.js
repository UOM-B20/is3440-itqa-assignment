const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { capitalize } = require('./common.steps');

When(
  "I click the category name sub categories should be visible",
  async function () {
    // Get all category panels
    const categoryPanels = await this.page.locator(".panel-default").all();
    expect(categoryPanels.length).toBeGreaterThan(0, "No categories found");

    // Select random category panel
    const randomIndex = Math.floor(Math.random() * categoryPanels.length);
    const randomPanel = categoryPanels[randomIndex];

    // Get and store category name
    this.currentCategory = await randomPanel
      .locator(".panel-title a")
      .textContent()
      .then((t) => t.trim());

    // Click category
    await randomPanel.locator(".panel-title a").click();
    await this.page.waitForTimeout(500);

    // Verify subcategories are visible
    const subcategoryPanel = this.page.locator(#${this.currentCategory});
    await expect(subcategoryPanel).toBeVisible();

    // Store subcategories for next step
    this.subcategories = await subcategoryPanel.locator("li a").all();
    expect(this.subcategories.length).toBeGreaterThan(
      0,
      "No subcategories found"
    );
  }
);

When("I click the subcategories we go the categories page", async function () {
  // Pick random subcategory
  const randomIndex = Math.floor(Math.random() * this.subcategories.length);
  const randomSubcategory = this.subcategories[randomIndex];

  // Get subcategory details
  const href = await randomSubcategory.getAttribute("href");
  this.categoryId = href.split("/").pop();
  this.currentSubcategory = await randomSubcategory
    .textContent()
    .then((t) => t.trim());

  // Click subcategory
  await randomSubcategory.click();

  // Verify navigation
  expect(this.page.url()).toBe(
    https://automationexercise.com/category_products/${this.categoryId}
  );
});

Then(
  "I verify that category page is display and confirm text with category_name- subcategory_name",
  async function () {
    // Get unique category title using more specific locator
    const categoryTitle = this.page.locator("h2.title.text-center", {
      hasText: ${this.currentCategory} - ${this.currentSubcategory},
    });

    await expect(categoryTitle).toBeVisible();
    await expect(categoryTitle).toContainText(
      ${this.currentCategory} - ${this.currentSubcategory} Products
    );
    expect(this.page.url()).toContain(/category_products/${this.categoryId});
  }
);
