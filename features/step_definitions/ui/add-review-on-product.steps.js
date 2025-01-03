const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the product review homepage', async function () {
  await this.page.goto('https://automationexercise.com');
});

When('the user clicks the products button', async function () {
  await this.page.click('a[href="/"]');
});

When('the user clicks "View Product"', async function () {
  await this.page.click('a[href="/product_details/1"]');
});

When('the user enters their name {string}', async function (name) {
  await this.page.fill('#name', name);
});

When('the user enters their email {string}', async function (email) {
  await this.page.fill('#email', email);
});

When('the user enters their review {string}', async function (review) {
  await this.page.fill('#review', review);
});

When('the user clicks the submit button', async function () {
  await this.page.click('#button-review');
});

Then('the user should see the message "Thank you for your review."', async function () {
  const message = await this.page.textContent('.alert-success');
  expect(message).toContain('Thank you for your review.');
});