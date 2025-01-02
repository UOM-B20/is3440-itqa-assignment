const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I add product with id {string} to cart", async function (productId) {
  // Wait for products container
  await this.page.waitForSelector(".features_items", {
    state: "visible",
    timeout: 30000,
  });

  // Find product element
  const productSelector = `.productinfo a.btn.add-to-cart[data-product-id="${productId}"]`;
  const addToCartButton = await this.page.locator(productSelector);

  // Check if product exists
  const isProductVisible = await addToCartButton.isVisible();

  if (!isProductVisible) {
    throw new Error(`Product with ID ${productId} not found or not visible`);
  }

  // Click add to cart for specified product
  await addToCartButton.click();

  // Wait for confirmation modal
  await this.page.waitForSelector("#cartModal", {
    state: "visible",
    timeout: 10000,
  });

  // Short wait for modal animation
  await this.page.waitForTimeout(1000);
});

When("I select {string} in the cart modal", async function (action) {
  // Verify modal is visible first
  const modal = await this.page.waitForSelector("#cartModal", {
    state: "visible",
    timeout: 10000,
  });
  expect(await modal.isVisible()).toBeTruthy();

  if (action.toLowerCase() === "continue shopping") {
    // Click continue shopping button
    await this.page.click(".close-modal");

    // Wait for modal to disappear
    await this.page.waitForSelector("#cartModal", {
      state: "hidden",
      timeout: 10000,
    });

    // Verify we stay on products page
    const currentUrl = this.page.url();
    expect(currentUrl).toContain("/products");
  } else if (action.toLowerCase() === "view cart") {
    // Click view cart link
    await this.page.click('#cartModal a[href="/view_cart"]');

    // Wait for navigation
    await this.page.waitForLoadState("networkidle", { timeout: 30000 });

    // Verify we're on cart page
    const currentUrl = this.page.url();
    expect(currentUrl).toContain("/view_cart");
  } else {
    throw new Error(`Invalid modal action: ${action}`);
  }
});

When(
  "I should see the product with id {string} in the cart",
  async function (id) {
    // Wait for cart container
    await this.page.waitForSelector("#cart_info", {
      state: "visible",
      timeout: 30000,
    });

    // Check if cart is empty
    const emptyCart = await this.page.locator("#empty_cart");
    const isEmptyCartVisible = await emptyCart.isVisible();

    if (isEmptyCartVisible) {
      throw new Error("Cart is empty when it should contain products");
    }

    // Check for cart table and product
    const cartTable = await this.page.waitForSelector("#cart_info_table", {
      state: "visible",
      timeout: 30000,
    });
    expect(await cartTable.isVisible()).toBeTruthy();

    // Verify product row exists
    const productRow = this.page.locator(`tr#product-${id}`);
    await expect(productRow).toBeVisible();

    // Verify product image
    const productImage = productRow.locator(".cart_product img");
    await expect(productImage).toBeVisible();
    const imgSrc = await productImage.getAttribute("src");
    expect(imgSrc).toBeTruthy();
    expect(imgSrc).toContain(`get_product_picture/${id}`);

    // Verify description
    const productName = await productRow
      .locator(".cart_description h4 a")
      .innerText();
    expect(productName).toBeTruthy();
    const productCategory = await productRow
      .locator(".cart_description p")
      .innerText();
    expect(productCategory).toBeTruthy();

    // Verify required elements exist and have values
    const quantity = await productRow
      .locator(".cart_quantity button")
      .innerText();
    expect(quantity).toBeTruthy();
    expect(Number(quantity)).toBeGreaterThan(0);

    const price = await productRow.locator(".cart_price p").innerText();
    expect(price).toMatch(/Rs\.\s*\d+/);

    const total = await productRow
      .locator(".cart_total .cart_total_price")
      .innerText();
    expect(total).toMatch(/Rs\.\s*\d+/);

    // Validate total calculation
    const priceValue = Number(price.replace("Rs.", "").trim());
    const totalValue = Number(total.replace("Rs.", "").trim());
    const expectedTotal = priceValue * Number(quantity);
    expect(totalValue).toBe(expectedTotal);
  }
);






// const { Given, When, Then } = require("@cucumber/cucumber");
// const { expect } = require("@playwright/test");

// When("I click on the Products button", async function () {
//   await this.page.click('a[href="/products"]');
// });

// When("I add the first product to cart", async function () {
//   await this.page.click('a[data-product-id="1"]');
// });

// When("I click ViewCart", async function () {
//   await this.page.waitForSelector('a[href="/view_cart"]', { timeout: 10000 });
//   await this.page.click('a[href="/view_cart"]');
//   // Wait for navigation
//   await this.page.waitForLoadState('networkidle', { timeout: 30000 });
// });

// Then("I should see the first product in the cart", async function () {
//   //Wait for cart container
//   await this.page.waitForSelector('.cart_info', { 
//     state: 'visible',
//     timeout: 30000 
//   });

//   //Wait for produc
//   await this.page.waitForSelector('tr#product-1', {
//     state: 'visible',
//     timeout: 30000
//   });

//   const productRow = this.page.locator('tr#product-1');
//   const productName = await productRow.locator("h4 a").innerText();
//   expect(productName).toBe("Blue Top");

//   const productQuantity = await productRow.locator(".cart_quantity button").innerText();
//   expect(productQuantity).toBe("1");

//   const productTotal = await productRow.locator(".cart_total p").innerText();
//   expect(productTotal).toBe("Rs. 500");
// });



// When("I add the second product to the cart", async function () {
//   await this.page.click('a[data-product-id="2"]');
// });

// When("I add the third product to the cart", async function () {
//   await this.page.click('a[data-product-id="3"]');
// });

// When("I clicking ViewCart", async function () {
//   await this.page.waitForSelector('a[href="/view_cart"]', { timeout: 10000 });
//   await this.page.click('a[href="/view_cart"]');
//   // Wait for navigation
//   await this.page.waitForLoadState('networkidle', { timeout: 30000 });
// });

// Then("I should see all products in the cart", async function () {
//   // await this.page.waitForLoadState('networkidle', { timeout: 30000 });
//   // await this.page.waitForSelector('.cart_info', { timeout: 30000 });
//   // await this.page.waitForSelector('tr#product-1', { timeout: 30000 });

//   const productRow = this.page.locator('tr#product-1');
//   const productName = await productRow.locator("h4 a").innerText();
//   expect(productName).toBe("Blue Top");

//   const productQuantity = await productRow.locator(".cart_quantity button").innerText();
//   expect(productQuantity).toBe("3");

//   const productTotal = await productRow.locator(".cart_total p").innerText();
//   expect(productTotal).toBe("Rs. 1500");
// });