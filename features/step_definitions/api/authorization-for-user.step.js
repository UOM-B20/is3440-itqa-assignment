const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const serverUtils = require("../../support/server-utils");

Given("the book database is empty", async function () {
  const isEmpty = await serverUtils.isDatabaseEmpty();
  expect(isEmpty).toBe(true);
});

Given("the book database has a book with id 1", async function () {
  await serverUtils.seedDatabase(1);

  const hasBook = await serverUtils.hasBookWithId(1);
  expect(hasBook).toBe(true);
});

Given(
  "I authenticated as username {string} and password {string}",
  async function (username, password) {
    this.currentAuth = serverUtils.getAuthHeader(username, password);
  }
);

When(
  "I send a {string} request to {string} with the body:",
  async function (method, endpoint, docString) {
    const data = JSON.parse(docString);

    switch (method.toUpperCase()) {
      case "POST":
        this.response = await this.apiContext.post(endpoint, {
          data,
          headers: this.currentAuth,
        });
        break;
      case "PUT":
        this.response = await this.apiContext.put(endpoint, {
          data,
          headers: this.currentAuth,
        });
        break;
    }
  }
);

When(
  "I send a {string} request to {string}",
  async function (method, endpoint) {
    switch (method.toUpperCase()) {
      case "GET":
        this.response = await this.apiContext.get(endpoint, {
          headers: this.currentAuth,
        });
        break;
      case "DELETE":
        this.response = await this.apiContext.delete(endpoint, {
          headers: this.currentAuth,
        });
        break;
    }
  }
);
