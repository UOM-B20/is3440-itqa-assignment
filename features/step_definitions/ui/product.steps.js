const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Then("I should see a list of products", async function () {
  // Check product container
  const productList = await this.page.locator(".features_items");
  await expect(productList).toBeVisible();

  // Get all product cards and verify count
  const productCards = await this.page.locator(".product-image-wrapper").all();
  expect(productCards.length).toBeGreaterThan(0, "No products found");

  // Verify first product has all required elements
  const firstProduct = productCards[0];
  await expect(firstProduct.locator(".productinfo img")).toBeVisible();
  await expect(firstProduct.locator(".productinfo h2")).toBeVisible(); // Price
  await expect(firstProduct.locator(".productinfo p")).toBeVisible(); // Name
  await expect(firstProduct.locator(".choose")).toBeVisible(); // View Product section
});

When(
  "I click on the View Product button for the first product",
  async function () {
    const viewProductButton = await this.page.locator(
      'a[href="/product_details/1"]'
    );
    await viewProductButton.click();
    expect(this.page.url()).toContain("/product_details/1");
  }
);

Then("I should see the product details displayed", async function () {
  const productDetails = await this.page.locator(".product-details");
  await expect(productDetails).toBeVisible();
  expect(this.page.url()).toBe(
    "https://automationexercise.com/product_details/1"
  );
});

When(
  "I click View Product button for a random product in the page",
  async function () {
    // Get all product cards
    const productCards = await this.page
      .locator(".product-image-wrapper")
      .all();
    expect(productCards.length).toBeGreaterThan(0, "No products found");

    // Select random product
    const randomIndex = Math.floor(Math.random() * productCards.length);
    const randomCard = productCards[randomIndex];

    // Extract product info
    const viewProductLink = randomCard.locator(".choose a");
    const href = await viewProductLink.getAttribute("href");
    this.productId = href.split("/").pop();

    // Store product name
    this.selectedProductName = await randomCard
      .locator(".productinfo p")
      .textContent();

    // Click and verify navigation
    await viewProductLink.click();

    // Explicit URL verification with extracted ID
    const currentUrl = this.page.url();
    expect(currentUrl).toBe(
      `https://automationexercise.com/product_details/${this.productId}`
    );
    expect(currentUrl).toMatch(/\/product_details\/\d+$/);
  }
);

Then(
  "I should see the product details for the selected product",
  async function () {
    // Verify URL and container
    await expect(this.page.url()).toBe(
      `https://automationexercise.com/product_details/${this.productId}`
    );

    const productDetails = this.page.locator(".product-details");
    await expect(productDetails).toBeVisible();

    // Verify product image
    await expect(productDetails.locator(".view-product img")).toBeVisible();

    // Verify product information section
    const productInfo = productDetails.locator(".product-information");
    await expect(productInfo).toBeVisible();

    // Verify all required elements
    await expect(productInfo.locator("h2")).toBeVisible(); // Product name
    await expect(
      productInfo.locator("p", { hasText: "Category:" })
    ).toBeVisible();
    await expect(productInfo.locator("span span")).toBeVisible(); // Price

    // Verify quantity and add to cart section
    await expect(productInfo.locator("#quantity")).toBeVisible();
    await expect(productInfo.locator("#product_id")).toHaveValue(
      this.productId
    );
    await expect(productInfo.locator("button.cart")).toBeVisible();

    // Verify product details
    await expect(
      productInfo.locator("p", { hasText: "Availability:" })
    ).toBeVisible();
    await expect(
      productInfo.locator("p", { hasText: "Condition:" })
    ).toBeVisible();
    await expect(productInfo.locator("p", { hasText: "Brand:" })).toBeVisible();
  }
);
