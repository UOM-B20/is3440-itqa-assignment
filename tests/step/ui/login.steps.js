const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I am on the login page", async function () {
  await this.page.goto("https://www.saucedemo.com/");
});

When("I enter username {string}", async function (username) {
  await this.page.fill("#user-name", username);
});

When("I enter password {string}", async function (password) {
  await this.page.fill("#password", password);
});

When("I click the login button", async function () {
  await this.page.click("#login-button");
});

Then("I should be on the inventory page", async function () {
  await expect(this.page).toHaveURL(/.*inventory.html/);
});

Then("I should see the products list", async function () {
  const productList = await this.page.locator(".inventory_list");
  await expect(productList).toBeVisible();
});

Then("I should see the error message {string}", async function (message) {
  const errorElement = await this.page.locator('[data-test="error"]');
  await expect(errorElement).toHaveText(message);
});
