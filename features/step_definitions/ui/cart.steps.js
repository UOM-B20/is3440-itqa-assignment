const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const UIUtils = require("../../support/ui-utils");
const exp = require("constants");

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

Given("cart is empty", async function () {
  // Empty the cart
  await UIUtils.emptyCart(this.page);
});

Given("I have following products in the cart:", async function (dataTable) {
  const products = dataTable.hashes(); // {id: '1', quantity: '2'}

  // EMPTY CART
  await UIUtils.emptyCart(this.page);

  // ADD PRODUCTS
  for (const product of products) {
    // Validate product id
    expect(product.id).toBeTruthy();
    expect(product.id.length).toBeGreaterThan(0);

    // Validate quantity
    const quantity = parseInt(product.quantity);
    expect(quantity).toBeDefined();
    expect(isNaN(quantity)).toBeFalsy();
    expect(quantity).toBeGreaterThan(0);

    // Add product to cart
    await UIUtils.addToCart(this.page, product.id, quantity);
  }
});

Then("I add following products to cart", async function (dataTable) {
  const products = dataTable.hashes(); // {id: '1', quantity: '2'}

  // EMPTY CART
  await UIUtils.emptyCart(this.page);

  // ADD PRODUCTS
  for (const product of products) {
    // Validate product id
    expect(product.id).toBeTruthy();
    expect(product.id.length).toBeGreaterThan(0);

    // Validate quantity
    const quantity = parseInt(product.quantity);
    expect(quantity).toBeDefined();
    expect(isNaN(quantity)).toBeFalsy();
    expect(quantity).toBeGreaterThan(0);

    // Add product to cart
    await UIUtils.addToCart(this.page, product.id, quantity);
  }
});

Then(
  "I should see the following products in the cart and validate totals:",
  async function (datatable) {
    const products = datatable.hashes(); // {id: '1', quantity: '2'}

    // VALIDATE CART URL
    expect(this.page.url()).toContain("/view_cart");

    for (const product of products) {
      // Validate product id
      expect(product.id).toBeTruthy();
      expect(product.id.length).toBeGreaterThan(0);

      // Validate quantity
      const quantity = parseInt(product.quantity);
      expect(quantity).toBeDefined();
      expect(isNaN(quantity)).toBeFalsy();
      expect(quantity).toBeGreaterThan(0);

      // Verify product in cart
      await UIUtils.verifyProductInCart(this.page, product.id, quantity);
    }
  }
);

When(
  "I remove product with id {string} from the cart",
  async function (productId) {
    expect(this.page.url()).toContain("/view_cart");

    // Wait for cart container
    await this.page.waitForSelector("#cart_info", {
      state: "visible",
      timeout: 30000,
    });

    // Check if cart is empty
    const emptyCart = await this.page.locator("#empty_cart");
    const isEmptyCartVisible = await emptyCart.isVisible();

    expect(isEmptyCartVisible).toBeFalsy();

    // Find product row
    const productRow = this.page.locator(`tr#product-${productId}`);
    const isProductVisible = await productRow.isVisible();

    expect(isProductVisible).toBeTruthy();

    // Click delete button
    await productRow.locator(".cart_quantity_delete").click();

    // Wait for item removal animation/processing
    await this.page.waitForTimeout(1000);
  }
);

Then(
  "I should not see product with id {string} in the cart",
  async function (productId) {
    expect(this.page.url()).toContain("/view_cart");
    // Wait for cart container
    await this.page.waitForSelector("#cart_info", {
      state: "visible",
      timeout: 30000,
    });

    // Check if cart is empty
    const emptyCart = await this.page.locator("#empty_cart");
    const isEmptyCartVisible = await emptyCart.isVisible();

    expect(isEmptyCartVisible).toBeFalsy();

    // Find product row
    const productRow = this.page.locator(`tr#product-${productId}`);
    const isProductVisible = await productRow.isVisible();

    expect(isProductVisible).toBeFalsy();
  }
);

Given("I have no products in the cart", async function () {
  // await UIUtils.emptyCart(this.page);
  await this.page.goto(`${this.UI_BASE_URL}/view_cart`, {
    timeout: 60000,
  });

  // VERIFY URL IS CORRECT
  expect(this.page.url()).toContain("/view_cart");

  // WAIT FOR CART CONTAINER
  await this.page.waitForSelector("#cart_info", {
    state: "visible",
    timeout: 30000,
  });

  // CHECK IF CART IS EMPTY
  const emptyCart = await this.page.locator("#empty_cart");
  const isEmptyCartVisible = await emptyCart.isVisible();

  expect(isEmptyCartVisible).toBeTruthy();
});

Then(
  "I should see the product quantity as {string} for product id:{string} in the cart",
  async function (quantity, id) {
    expect(this.page.url()).toContain("/view_cart");

    // Wait for cart container
    await this.page.waitForSelector("#cart_info", {
      state: "visible",
      timeout: 30000,
    });

    // Check if cart is empty
    const emptyCart = await this.page.locator("#empty_cart");
    const isEmptyCartVisible = await emptyCart.isVisible();

    expect(isEmptyCartVisible).toBeFalsy();

    // Find product row
    const productRow = this.page.locator(`tr#product-${id}`);
    const isProductVisible = await productRow.isVisible();

    expect(isProductVisible).toBeTruthy();

    // Verify quantity
    const productQuantity = await productRow
      .locator(".cart_quantity button")
      .innerText();
    expect(productQuantity).toBe(quantity);
  }
);
