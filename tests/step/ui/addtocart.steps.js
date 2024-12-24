const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I navigate to the home page', async function () {
  await this.page.goto('http://automationexercise.com');
});

When('I click the cart button', async function () {
  await this.page.click('a[href="/view_cart"]');
});

Then('I should see the cart is empty', async function () {
  const cartText = await this.page.locator('#gda-search-term').innerText();
  expect(cartText).toBe('Cart');
});

When('I search for {string}', async function (productName) {
  await this.page.fill('#search_product', productName);
  await this.page.click('#submit_search');
});

Then('I should see the search result with {string}', async function (productName) {
  const productText = await this.page.locator('.productinfo p').innerText();
  expect(productText).toBe(productName);
});

When('I add the product to the cart', async function () {
  await this.page.click('.btn.add-to-cart');
});

Then('I should see a confirmation message', async function () {
  const modalText = await this.page.locator('.modal-body p.text-center').first().innerText();
  expect(modalText).toContain('Your product has been added to cart.');
});

Then('I should be able to view the cart', async function () {
  await this.page.click('a[href="/view_cart"]');
  const cartPageTitle = await this.page.title();
  expect(cartPageTitle).toContain('Cart');
});

When('I search for {string}', async function (productName) {
    await this.page.fill('#search_product', productName);
    await this.page.click('#submit_search');
  });
  
  Then('I should not see any search results', async function () {
    const results = await this.page.locator('.productinfo');
    const count = await results.count();
    expect(count).toBe(0); // Expect no search results
  });
  
  Then('there should be no error message displayed', async function () {
    const errorMessage = await this.page.locator('.error-message'); // Replace with the actual error message locator if it exists
    const isVisible = await errorMessage.isVisible();
    expect(isVisible).toBe(false); // Expect no error message
  });