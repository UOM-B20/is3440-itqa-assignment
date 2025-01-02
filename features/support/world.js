const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { chromium, request } = require("@playwright/test");
const serverUtils = require("./server-utils");
const ApiClient = require("./api-client");

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.debug = false;
    this.apiContext = null;
    this.response = null;
    this.currentAuth = null;
    this.storedBookId = null;
    this.serverUtils = serverUtils;
    this.UI_BASE_URL = "https://automationexercise.com";
    this.api = new ApiClient(serverUtils.BASE_URL);
  }

  async initAPI() {
    await this.api.init();
    return this.api.context;
  }

  async closeAPI() {
    await this.reset();
  }

  async initUI() {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
      // go to the base URL
      await this.page.goto(this.UI_BASE_URL);
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

  getAuthHeader(username, password) {
    return {
      Authorization:
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    };
  }

  async reset() {
    await this.api.dispose();

    this.response = null;
    this.currentAuth = null;
    this.storedBookId = null;
  }
}

setWorldConstructor(CustomWorld);
