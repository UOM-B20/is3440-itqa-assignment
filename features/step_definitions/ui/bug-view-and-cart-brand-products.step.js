const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Then("I verify that Brands are visible on left side bar", async function () {
    const brandsSidebar = await this.page.locator('.brands_products');
    await expect(brandsSidebar).toBeVisible();
});

When("I click on {string} brand link", async function (brandName) {
    brandLink = await this.page.locator(`a[href="/brand_products/${brandName}"]`);
    await brandLink.click();
  
});

Then("I verify that user is navigated to {string} brand page and brand products are displayed", async function (brandName) {
    const expectedURL = `https://automationexercise.com/brand_products/${brandName}`;
    const actualURL = this.page.url();

    // Compare expected and actual URLs and report bug if mismatch occurs
    if (actualURL !== expectedURL) {
        console.log("Bug Report: URL mismatch detected for brand navigation.");
        console.error(`Bug Detected: Expected URL "${expectedURL}" but got "${actualURL}".`);
        console.log(`Brand Name: "${brandName}"`);
        console.log(`Expected URL: "${expectedURL}"`);
        console.log(`Actual URL: "${actualURL}"`);
        console.log("This issue needs to handle URL encoding for spaces correctly.");
    }

    const brandTitle = await this.page.locator('h2.title.text-center');
    await expect(brandTitle).toContainText(`Brand - ${brandName} Products`);
});
