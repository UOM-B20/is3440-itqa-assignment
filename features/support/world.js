const { setWorldConstructor, World } = require("@cucumber/cucumber");
const serverUtils = require("./server-utils");
const uiUtils = require("./ui-utils");
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
    this.uiUtils = uiUtils;
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
    const { page } = await uiUtils.getBrowserInstances();
    this.page = page;
    await this.page.goto(this.UI_BASE_URL);
    return this.page;
  }

  async closeUI() {
    this.page = null;
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
