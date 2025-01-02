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

// Helper function to check if test has specific tag
const hasTag = (pickle, tagName) => 
  pickle.tags.some((tag) => tag.name === tagName);

// API hooks
BeforeAll(async function ({ pickle }) {
  // Only run for API scenarios
  if (hasTag(pickle, "@api")) {
    await serverUtils.startServer();
  }
});

AfterAll(async function ({ pickle }) {
  // Only run for API scenarios
  if (hasTag(pickle, "@api")) {
    await serverUtils.shutdown();
  }
});

// UI hooks - only initialized when running UI tests
BeforeAll(async function ({ pickle }) {
  if (hasTag(pickle, "@ui")) {
    await uiUtils.initBrowser();
  }
});

AfterAll(async function ({ pickle }) {
  if (hasTag(pickle, "@ui")) {
    await uiUtils.closeBrowser();
  }
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
