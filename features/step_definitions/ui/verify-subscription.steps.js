const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

let browser, page;

Given("I launch the browser", async () => {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
});

Given("I navigate to {string}", async (url) => {
  await page.goto(url, { timeout: 60000 });
});

Then("the home page should be visible", async () => {
  const title = await page.title();
  expect(title).toContain("Automation Exercise");
});

When("I scroll to the bottom of the page", async function () {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(1000); // Wait for scroll to complete
});

Then("I should see the text {string}", async (text) => {
  const isVisible = await page.isVisible(`text=${text}`);
  expect(isVisible).toBeTruthy();
});

When(
  "I enter my email address {string} and click the arrow button",
  async (email) => {
    await page.fill('[data-qa="suscribe_email"]', email);
    await page.click('[data-qa="subscribe-button"]'); // Adjust the selector as needed
  }
);

Then("I should see the success message {string}", async (successMessage) => {
  const isVisible = await page.isVisible(`text=${successMessage}`);
  expect(isVisible).toBeTruthy();
  await browser.close();
});
