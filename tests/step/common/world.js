const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.debug = false;
  }

  async initAPI() {
    if (!this.apiContext) {
      const browser = await chromium.launch({ headless: true });
      this.apiContext = await browser.newContext({
        baseURL: "http://localhost:7081",
      });
      this.apiRequest = this.apiContext.request;
    }
    return this.apiContext;
  }

  async initUI() {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    }
    return this.page;
  }

  async closeAPI() {
    if (this.apiContext) {
      await this.apiContext.close();
      this.apiContext = null;
      this.apiRequest = null;
    }
  }

  async closeUI() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.context = null;
      this.page = null;
    }
  }
}

setWorldConstructor(CustomWorld);
