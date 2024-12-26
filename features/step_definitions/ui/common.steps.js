const { When, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I navigate to the URL {string}", async function (url) {
  await this.page.goto(url, { timeout: 60000 }); // Increase timeout to 60 seconds
});

When("I click the Products button", async function () {
  const productBtn = await this.page.locator("li:has(i.material-icons.card_travel)");
  await expect(productBtn).toContainText("Products");
  await productBtn.click();
  expect(this.page.url()).toContain("/products");
});

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

async function viewProductDetailsForEachProduct(page) {
  const productCount = await page.locator('.features_items .product-image-wrapper').count();
  for (let i = 1; i <= productCount; i++) {
    const viewProductButton = await page.locator(`a[href="/product_details/${i}"]`);
    await viewProductButton.click();
    expect(page.url()).toContain(`/product_details/${i}`);
    // Navigate back to the products page to continue the loop
    await page.goBack();
  }
}

module.exports = { capitalize, viewProductDetailsForEachProduct };