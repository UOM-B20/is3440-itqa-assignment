const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { chromium, request } = require("@playwright/test");
const serverUtils = require("./server-utils");

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.debug = false;
    this.apiContext = null;
    this.response = null;
    this.currentAuth = null;
    this.storedBookId = null;
  }

  async initAPI() {
    this.apiContext = await request.newContext({
      baseURL: serverUtils.BASE_URL,
      storageState: undefined,
    });
    return this.apiContext;
  }

  async closeAPI() {
    await this.reset();
  }

  async initUI() {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    }
    return this.page;
  }

  async closeUI() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.context = null;
      this.page = null;
    }
  }

  async reset() {
    if (this.apiContext) {
      await this.apiContext.dispose();
      this.apiContext = null;
    }

    this.response = null;
    this.currentAuth = null;
    this.storedBookId = null;
  }
}

setWorldConstructor(CustomWorld);
