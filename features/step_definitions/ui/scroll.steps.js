const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I scroll to the bottom of the page", async function () {
  await this.page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  // Wait for scroll to complete
  await this.page.waitForTimeout(1000);
});

When("I scroll to the top of the page", async function () {
  await this.page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  // Wait for scroll to complete
  await this.page.waitForTimeout(1000);
});

Then("I should see the subscription form in the footer", async function () {
  const subscriptionForm = this.page.locator(
    "#footer .single-widget form.searchform"
  );
  await expect(subscriptionForm).toBeVisible();

  // Verify subscription form elements
  await expect(subscriptionForm.locator("#susbscribe_email")).toBeVisible();
  await expect(subscriptionForm.locator("#subscribe")).toBeVisible();
});

Then("I should see the website logo", async function () {
  const logo = this.page.locator(".logo.pull-left img");
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute("alt", "Website for automation practice");
});

When("I click the scroll-up button", async function () {
  const scrollUpButton = this.page.locator("#scrollUp");
  await scrollUpButton.click();
  // Wait for scroll animation to complete
  await this.page.waitForTimeout(1000);
});

Then("I should see the complete header", async function () {
  const header = this.page.locator("#header");
  await expect(header).toBeVisible();

  const headerMiddle = header.locator(".header-middle");
  await expect(headerMiddle).toBeVisible();

  // Verify header container exists and is visible
  const headerContainer = headerMiddle.locator(".container");
  await expect(headerContainer).toBeVisible();
});

Then("I should see the following header elements", async function (dataTable) {
  const elements = dataTable.hashes();

  for (const element of elements) {
    const locator = this.page.locator(element.Selector);
    await expect(locator).toBeVisible();
  }
});

When("I scroll down {int}% of the page", async function (percentage) {
  await this.page.evaluate((scrollPercentage) => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollAmount = (totalHeight * scrollPercentage) / 100;
    window.scrollTo(0, scrollAmount);
  }, percentage);

  // Wait for scroll to complete and any animations
  await this.page.waitForTimeout(1000);
});

Then("the scroll-up button should be {word}", async function (visibility) {
  const scrollUpButton = this.page.locator("#scrollUp");
  if (visibility === "visible") {
    await expect(scrollUpButton).toBeVisible();
  } else {
    await expect(scrollUpButton).toBeHidden();
  }
});
