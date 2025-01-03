const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { chromium } = require("playwright");

let browser, page;

Given("I open the browser", async () => {
  browser = await chromium.launch({ headless: true }); //changed to true for server
  const context = await browser.newContext();
  page = await context.newPage();
});

Given("I navigate to the {string}", async (url) => {
  await page.goto(url, { timeout: 60000 });
});

Then("home page should be visible", async () => {
  const title = await page.title();
  expect(title).toContain("Automation Exercise");
});

When("I scroll to bottom of the page", async function () {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(10000); // Wait for scroll to complete
});

Then("I should see the text {string}", async (text) => {
  const isVisible = await page.isVisible(`text=${text}`);
  expect(isVisible).toBeTruthy();
});

When(
  "I enter my email address {string} and click the arrow button",
  async (email) => {
    await page.fill('[id="susbscribe_email"]', email);
    await page.click('[id="subscribe"]'); // Adjust the selector as needed
  }
);

Then("I should see the success message {string}", async (successMessage) => {
  const isVisible = await page.isVisible(`text=${successMessage}`);
  expect(isVisible).toBeTruthy();
  await browser.close();
});
