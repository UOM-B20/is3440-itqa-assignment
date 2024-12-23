const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");
const serverUtils = require("./server-utils");

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.debug = false;
  }

  async initAPI() {
    await serverUtils.init();
    this.apiContext = serverUtils.apiContext;
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
