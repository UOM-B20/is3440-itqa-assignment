const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the homepage', async function () {
  await this.page.goto('https://automationexercise.com');
});

When('the user goes to Recommended Items', async function () {
  await this.page.waitForSelector('.recommended_items');
});

When('the user clicks the "Add to cart" button for the item with product id {string}', async function (productId) {
  await this.page.click(`a[data-product-id="${productId}"]`);
});

Then('the user should see the popup message "Added! Your product has been added to cart."', async function () {
  const popupMessage = await this.page.textContent('.modal-body p');
  expect(popupMessage).toContain('Added! Your product has been added to cart.');
});