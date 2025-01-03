const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the homepage', async function () {
  await this.page.goto('https://automationexercise.com');
});

When('the user goes to Recommended Items', async function () {
  await this.page.waitForSelector('.recommended_items');
  await this.page.evaluate(() => {
    document.querySelector('.recommended_items').scrollIntoView();
  });
});

When('the user clicks the "Add to cart" button for the item with product id {string}', async function (productId) {
  await this.page.click(`a[data-product-id="${productId}"]`);
  await this.page.waitForSelector('.modal-content');
});

Then('the user should see {string} in the modal title', async function (expectedTitle) {
  await this.page.waitForSelector('.modal-title');
  const modalTitle = await this.page.textContent('.modal-title');
  expect(modalTitle.trim()).toBe(expectedTitle);
});

// Then('the user should see {string} in the modal body', async function (expectedMessage) {
//   await this.page.waitForSelector('.modal-body p.text-center');
//   const modalBody = await this.page.locator('.modal-body p.text-center').first().textContent();
//   expect(modalBody.trim()).toBe(expectedMessage);
// });
// And the user should see "Your product has been added to cart." in the modal body