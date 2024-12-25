const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given('I navigate to the URL {string}', async function (url) {
    await this.page.goto(url);
});

When("I click the Products button", async function () {
    const productBtn = await this.page.locator("li:has(i.material-icons.card_travel)");
    await expect(productBtn).toContainText("Products");
    await productBtn.click();
    expect(this.page.url()).toContain("/products");
});