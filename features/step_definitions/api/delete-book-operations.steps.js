const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, request } = require('@playwright/test');

Given('I am an authenticated user', async function () {
  // Set up authentication for a regular user
  this.apiContext = await request.newContext({
    baseURL: 'http://localhost:7081',
    extraHTTPHeaders: {
      'Authorization': 'Bearer user-token'
    }
  });
});

Given('I am an authenticated admin', async function () {
  // Set up authentication for an admin user
  this.apiContext = await request.newContext({
    baseURL: 'http://localhost:7081',
    extraHTTPHeaders: {
      'Authorization': 'Bearer admin-token'
    }
  });
});

When('I attempt to delete a non-existing book with ID {string}', async function (bookId) {
  this.response = await this.apiContext.delete(`/api/books/${bookId}`);
});

When('I delete an existing book with ID {string}', async function (bookId) {
  this.response = await this.apiContext.delete(`/api/books/${bookId}`);
});

Then('I should receive a {string} error', async function (statusCode) {
  expect(this.response.status()).toBe(parseInt(statusCode));
});

Then('I should receive a {string} response', async function (statusCode) {
  expect(this.response.status()).toBe(parseInt(statusCode));
});

Then('the book should no longer exist', async function () {
  const checkResponse = await this.apiContext.get(`/api/books/1`);
  expect(checkResponse.status()).toBe(404);
});