const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const uiUtils = require("../../support/ui-utils");

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
      ` https://automationexercise.com/brand_products/${encodedName}`
    );

    // Verify brand title
    const brandTitle = this.page.locator("h2.title.text-center");
    await expect(brandTitle).toContainText(
      `Brand - ${this.brandName} Products`
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
    const subcategoryPanel = this.page.locator(`#${this.currentCategory}`);
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
    `https://automationexercise.com/category_products/${this.categoryId}`
  );
});

Then(
  "I verify that category page is display and confirm text with category_name- subcategory_name",
  async function () {
    // Get unique category title using more specific locator
    const categoryTitle = this.page.locator("h2.title.text-center", {
      hasText: `${this.currentCategory} - ${this.currentSubcategory}`,
    });

    await expect(categoryTitle).toBeVisible();
    await expect(categoryTitle).toContainText(
      `${this.currentCategory} - ${this.currentSubcategory} Products`
    );
    expect(this.page.url()).toContain(`/category_products/${this.categoryId}`);
  }
);
