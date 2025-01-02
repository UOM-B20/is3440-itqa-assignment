const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I click on the Products button", async function () {
  await this.page.click('a[href="/products"]');
});

When("I add the first product to cart", async function () {
  await this.page.click('a[data-product-id="1"]');
});

When("I click ViewCart", async function () {
  await this.page.waitForSelector('a[href="/view_cart"]', { timeout: 10000 });
  await this.page.click('a[href="/view_cart"]');
  // Wait for navigation
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });
});

Then("I should see the first product in the cart", async function () {
  //Wait for cart container
  await this.page.waitForSelector('.cart_info', { 
    state: 'visible',
    timeout: 30000 
  });

  //Wait for product
  await this.page.waitForSelector('tr#product-1', {
    state: 'visible',
    timeout: 30000
  });

  const productRow = this.page.locator('tr#product-1');
  const productName = await productRow.locator("h4 a").innerText();
  expect(productName).toBe("Blue Top");

  const productQuantity = await productRow.locator(".cart_quantity button").innerText();
  expect(productQuantity).toBe("1");

  const productTotal = await productRow.locator(".cart_total p").innerText();
  expect(productTotal).toBe("Rs. 500");
});



When("I add the second product to the cart", async function () {
  await this.page.click('a[data-product-id="2"]');
});

When("I add the third product to the cart", async function () {
  await this.page.click('a[data-product-id="3"]');
});

When("I clicking ViewCart", async function () {
  await this.page.waitForSelector('a[href="/view_cart"]', { timeout: 10000 });
  await this.page.click('a[href="/view_cart"]');
  // Wait for navigation
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });
});

Then("I should see all products in the cart", async function () {
  // await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  // await this.page.waitForSelector('.cart_info', { timeout: 30000 });
  // await this.page.waitForSelector('tr#product-1', { timeout: 30000 });

  const productRow = this.page.locator('tr#product-1');
  const productName = await productRow.locator("h4 a").innerText();
  expect(productName).toBe("Blue Top");

  const productQuantity = await productRow.locator(".cart_quantity button").innerText();
  expect(productQuantity).toBe("3");

  const productTotal = await productRow.locator(".cart_total p").innerText();
  expect(productTotal).toBe("Rs. 1500");
});