const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I click the Products button", async function () {
  await this.page.click('a[href="/products"]');
});

When("I add the first product to the cart", async function () {
  await this.page.click('a[data-product-id="1"]');
});

When("I click View Cart", async function () {
  await this.page.click('a[href="/view_cart"]');
});

Then("I should see the first product in the cart", async function () {
  const productRow = await this.page.locator('tr#product-1');
  await expect(productRow).toBeVisible();
  const productName = await productRow.locator("h4 a").innerText();
  expect(productName).toBe("Blue Top");

  const productPrice = await productRow.locator(".cart_price p").innerText();
  expect(productPrice).toBe("Rs. 500");

  const productQuantity = await productRow.locator(".cart_quantity button").innerText();
  expect(productQuantity).toBe("1");

  const productTotal = await productRow.locator(".cart_total p").innerText();
  expect(productTotal).toBe("Rs. 500");
});

When("I click Continue Shopping", async function () {
  await this.page.click('button[data-dismiss="modal"]');
});

When("I add the second product to the cart", async function () {
  await this.page.click('a[data-product-id="2"]');
});

When("I add the third product to the cart", async function () {
  await this.page.click('a[data-product-id="2"]'); // Adding the second product again
});

Then("I should see all products in the cart", async function () {
  const productOne = await this.page.locator('tr#product-1');
  await expect(productOne).toBeVisible();
  const productOneName = await productOne.locator("h4 a").innerText();
  expect(productOneName).toBe("Blue Top");

  const productTwo = await this.page.locator('tr#product-2');
  await expect(productTwo).toBeVisible();
  const productTwoName = await productTwo.locator("h4 a").innerText();
  expect(productTwoName).toBe("Men Tshirt");

  const productTwoQuantity = await productTwo.locator(".cart_quantity button").innerText();
  expect(productTwoQuantity).toBe("2");

  const productTwoTotal = await productTwo.locator(".cart_total p").innerText();
  expect(productTwoTotal).toBe("Rs. 800");
});


// const { Given, When, Then } = require("@cucumber/cucumber");
// const { expect } = require("@playwright/test");

// When("I click the Products button", async function () {
//   const productBtn = await this.page.locator(
//     "li:has(i.material-icons.card_travel)"
//   );
//   await expect(productBtn).toContainText("Products");
//   await productBtn.click();
//   expect(this.page.url()).toContain("/products");
// });

// When("I add first product to cart", async function () {
//   await this.page.hover('a[data-product-id="1"]');
//   await this.page.click('a[data-product-id="1"].add-to-cart');
// });

// When("I click Continue Shopping", async function () {
//   const continueBtn = await this.page.locator(
//     'button.btn-success[data-dismiss="modal"]'
//   );
//   await continueBtn.click();
// });

// When("I add second product to cart", async function () {
//   await this.page.hover('a[data-product-id="2"]');
//   await this.page.click('a[data-product-id="2"].add-to-cart');
// });

// When("I click View Cart", async function () {
//   const viewCartBtn = await this.page.locator(
//     '.modal-body a[href="/view_cart"]'
//   );

//   await expect(viewCartBtn).toContainText("Cart");
//   await viewCartBtn.click();

//   // Verify URL
//   expect(this.page.url()).toContain("/view_cart");
// });

// Then("I should see both products in cart", async function () {
//   // Verify first product exists
//   const product1 = await this.page.locator("#product-1");
//   await expect(product1).toBeVisible();

//   // Verify second product exists
//   const product2 = await this.page.locator("#product-2");
//   await expect(product2).toBeVisible();

//   // Optional: Verify product names
//   const product1Name = await this.page
//     .locator("#product-1 .cart_description h4 a")
//     .textContent();
//   const product2Name = await this.page
//     .locator("#product-2 .cart_description h4 a")
//     .textContent();
//   expect(product1Name).toContain("Blue Top");
//   expect(product2Name).toContain("Men Tshirt");
// });
