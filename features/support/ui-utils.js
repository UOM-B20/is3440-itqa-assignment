const { chromium } = require("@playwright/test");

class UIUtils {
  constructor() {
    this.UI_BASE_URL = "https://automationexercise.com";
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async initBrowser() {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    }
    return {
      browser: this.browser,
      context: this.context,
      page: this.page,
    };
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.context = null;
      this.page = null;
    }
  }

  getBrowserInstances() {
    return {
      browser: this.browser,
      context: this.context,
      page: this.page,
    };
  }

  capitalize(str) {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  encodeForUrl(brandName) {
    return brandName.replace(/\s/g, "%20");
  }
}

module.exports = new UIUtils();
