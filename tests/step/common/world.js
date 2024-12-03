const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

class CustomWorld extends World {
  async setUp() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async tearDown() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
