const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");
const ServerManager = require("../../../utils/server-manager");
const TestDataManager = require("../../../utils/seed-test-data");

setDefaultTimeout(30 * 1000);
const server = new ServerManager();
let testDataManager;

BeforeAll(async () => {
  try {
    await server.start();
  } catch (error) {
    console.error("Server failed to start:", error);
    throw error;
  }
});

Before(async function ({ pickle }) {
  // UI test setup
  if (pickle.tags.some((tag) => tag.name === "@ui")) {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  // API test setup
  if (this.apiContext) {
    testDataManager = new TestDataManager(this.apiContext);
    await testDataManager.setupTestData();
  }
});

After(async function ({ pickle }) {
  // UI test cleanup
  if (pickle.tags.some((tag) => tag.name === "@ui")) {
    await this.browser?.close();
  }

  // API test cleanup
  if (testDataManager) {
    await testDataManager.cleanupTestData();
  }
});

AfterAll(async () => {
  await server.stop();
});
