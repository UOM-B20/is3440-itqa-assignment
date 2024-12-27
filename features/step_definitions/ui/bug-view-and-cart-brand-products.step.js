const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I click on random brand name", async function () {
  // Get all brand links
  const brandLinks = await this.page.locator(".brands-name ul li a").all();
  expect(brandLinks.length).toBeGreaterThan(0, "No brands found");

  // Select random brand
  const randomIndex = Math.floor(Math.random() * brandLinks.length);
  const randomBrand = brandLinks[randomIndex];

  // Store brand details
  const href = await randomBrand.getAttribute("href");
  this.brandName = href.split("/").pop();

  // Get product count from span
  const countSpan = await randomBrand.locator("span").textContent();
  this.expectedCount = parseInt(countSpan.match(/\((\d+)\)/)[1]);

  // Click brand link
  await randomBrand.click();
});

Then(
  "I verify that user is navigated to brand page and brand products are displayed",
  async function () {
    // Verify URL
    const encodedName = uiUtils.encodeForUrl(this.brandName);
    expect(this.page.url()).toBe(
      https://automationexercise.com/brand_products/${encodedName}
    );

    // Verify brand title
    const brandTitle = this.page.locator("h2.title.text-center");
    await expect(brandTitle).toContainText(
      Brand - ${this.brandName} Products
    );
  }
);

Then(
  "I verify that items count near the brand name is correct match with the products displayed",
  async function () {
    // Count actual products
    const products = await this.page.locator(".product-image-wrapper").all();

    // Verify count matches expected
    expect(products.length).toBe(this.expectedCount);
  }
);
