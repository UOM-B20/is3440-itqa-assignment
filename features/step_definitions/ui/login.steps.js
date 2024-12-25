const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I navigate to the URL {string}", async function (url) {
  await this.page.goto(url, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
});

When("I enter email {string}", async function (email) {
  await this.page.fill('input[data-qa="login-email"]', email);
});

When("I enter password {string}", async function (password) {
  await this.page.fill('input[data-qa="login-password"]', password);
});

When("I click the login button", async function () {
  await this.page.click('button[data-qa="login-button"]');
});

Then(
  "I should see {string} in the header navigation near the user icon",
  async function (message) {
    const element = await this.page.locator("li:has(i.fa-user):has(b)");
    const text = await element.textContent();
    expect(text.trim()).toEqual(message);
  }
);
