const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the search product discovery homepage', async function () {
  const currentURL = this.page.url();
  expect(currentURL).toContain('automationexercise.com/products');
});

When('the user enters {string} into the search bar', async function (product) {
  await this.page.fill('#search_product', product);
});

When('the user clicks the search button', async function () {
  await this.page.click('#submit_search');
});

Then('the user should see search results for {string}', async function (product) {
  await this.page.waitForSelector('.productinfo p');
  const productText = await this.page.textContent('.productinfo p');
  expect(productText).toContain(product);
});