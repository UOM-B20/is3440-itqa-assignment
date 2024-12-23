const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I click the Products button", async function () {
  const productBtn = await this.page.locator(
    "li:has(i.material-icons.card_travel)"
  );
  await expect(productBtn).toContainText("Products");
  await productBtn.click();
  expect(this.page.url()).toContain("/products");
});

When("I add first product to cart", async function () {
  await this.page.hover('a[data-product-id="1"]');
  await this.page.click('a[data-product-id="1"].add-to-cart');
});

When("I click Continue Shopping", async function () {
  const continueBtn = await this.page.locator(
    'button.btn-success[data-dismiss="modal"]'
  );
  await continueBtn.click();
});

When("I add second product to cart", async function () {
  await this.page.hover('a[data-product-id="2"]');
  await this.page.click('a[data-product-id="2"].add-to-cart');
});

When("I click View Cart", async function () {
  const viewCartBtn = await this.page.locator(
    '.modal-body a[href="/view_cart"]'
  );

  await expect(viewCartBtn).toContainText("Cart");
  await viewCartBtn.click();

  // Verify URL
  expect(this.page.url()).toContain("/view_cart");
});

Then("I should see both products in cart", async function () {
  // Verify first product exists
  const product1 = await this.page.locator("#product-1");
  await expect(product1).toBeVisible();

  // Verify second product exists
  const product2 = await this.page.locator("#product-2");
  await expect(product2).toBeVisible();

  // Optional: Verify product names
  const product1Name = await this.page
    .locator("#product-1 .cart_description h4 a")
    .textContent();
  const product2Name = await this.page
    .locator("#product-2 .cart_description h4 a")
    .textContent();
  expect(product1Name).toContain("Blue Top");
  expect(product2Name).toContain("Men Tshirt");
});
