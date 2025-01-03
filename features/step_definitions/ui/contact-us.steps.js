// cucumber/steps/contactUsSteps.js
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { chromium } = require("playwright");

let browser, page;

Given("I launch the browser", async () => {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
});

Given("I navigate to {string}", async (url) => {
  await page.goto(url);
});

Then("the home page should be visible", async () => {
  const title = await page.title();
  expect(title).toContain("Automation Exercise");
});

When("I click on the {string} button", async (buttonText) => {
  await page.click(`text=${buttonText}`);
});

Then("{string} should be visible", async (text) => {
  const isVisible = await page.isVisible(`text=${text}`);
  expect(isVisible).toBeTruthy();
});

When("I fill in the contact form with valid data", async () => {
  await page.fill('[data-qa="name"]', "John Doe");
  await page.fill('[data-qa="email"]', "johndoe@example.com");
  await page.fill('[data-qa="subject"]', "Test Subject");
  await page.fill('[data-qa="message"]', "This is a test message.");
});

When("I upload a file", async () => {
  const filePath = "./testfile.txt"; // Ensure this file exists in your test environment
  await page.setInputFiles('input[name="upload_file"]', filePath);
});

When("I click the {string} button", async (buttonText) => {
  await page.click(`[data-qa="submit-button"]`);
});

When("I confirm the alert", async () => {
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });
});

Then("I should see the success message {string}", async (successMessage) => {
  const isVisible = await page.isVisible(`text=${successMessage}`);
  expect(isVisible).toBeTruthy();
});

When("I click on the {string} button", async (buttonText) => {
  await page.click(`text=${buttonText}`);
});

Then("I should be back on the home page", async () => {
  const isHomeVisible = await page.isVisible(
    "text=Full-Fledged practice website for Automation Engineers"
  );
  expect(isHomeVisible).toBeTruthy();
  await browser.close();
});
