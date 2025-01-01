const { When } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When(
  "I user {string} authenticated with email {string} and password {string}",
  async function (name, email, password) {
    await this.page.goto("http://automationexercise.com/login");
    await this.page.fill('input[data-qa="login-email"]', email);
    await this.page.fill('input[data-qa="login-password"]', password);
    await this.page.click('button[data-qa="login-button"]');

    const element = await this.page.locator("li:has(i.fa-user):has(b)");
    const text = await element.textContent();
    const expectedText = `Logged in as ${name}`;

    expect(text.trim()).toEqual(expectedText);
  }
);
