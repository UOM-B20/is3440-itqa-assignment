const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the homepage', async function () {
  await this.page.goto('https://automationexercise.com/products');
});

When('the user enters {string} into the search bar', async function (product) {
  await this.page.fill('#search_product', product);
});

When('the user clicks the search button', async function () {
  await this.page.click('#submit_search');
});

Then('the user should see search results for {string}', async function (product) {
  const productText = await this.page.textContent('.productinfo p');
  expect(productText).toContain(product);
});