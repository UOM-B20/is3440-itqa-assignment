const {
  Before,
  After,
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
} = require("@cucumber/cucumber");
const serverUtils = require("./server-utils");
const uiUtils = require("./ui-utils");

setDefaultTimeout(60 * 1000);

BeforeAll({ tags: "@api" }, async function () {
  await serverUtils.startServer();
});

AfterAll({ tags: "@api" }, async function () {
  await serverUtils.shutdown();
});

BeforeAll({ tags: "@ui" }, async function () {
  await uiUtils.initBrowser();
});

AfterAll({ tags: "@ui" }, async function () {
  await uiUtils.closeBrowser();
});

Before(async function ({ pickle }) {
  // UI test setup
  if (pickle.tags.some((tag) => tag.name === "@ui")) {
    if (!this.browser) {
      await this.initUI();
    } else {
      // Just navigate to base URL and clear state
      await this.page.goto(this.UI_BASE_URL);
      await this.page.context().clearCookies();
    }
  }

  // API test setup
  if (pickle.tags.some((tag) => tag.name === "@api")) {
    await serverUtils.clearDatabase();
    await this.reset();
    await this.initAPI();
  }
});

After(async function ({ pickle }) {
  // UI test cleanup
  if (pickle.tags.some((tag) => tag.name === "@ui")) {
    // Clear cookies and localStorage instead of closing browser
    await this.page.context().clearCookies();
    await this.page.evaluate(() => window.localStorage.clear());
  }

  // API test cleanup
  if (pickle.tags.some((tag) => tag.name === "@api")) {
    await this.closeAPI();
    await serverUtils.clearDatabase();
  }
});
