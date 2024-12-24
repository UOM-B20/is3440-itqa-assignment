const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given(
  "I authenticated as username {string} and password {string}",
  async function (username, password) {
    this.currentAuth = this.getAuthHeader(username, password);
  }
);
