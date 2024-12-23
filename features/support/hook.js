const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");
// const ServerManager = require("./server-manager");
// const TestDataManager = require("./seed-test-data");

setDefaultTimeout(60 * 1000);
// const server = new ServerManager();
// let testDataManager;

// BeforeAll(async () => {
//   try {
//     await server.start();
//   } catch (error) {
//     console.error("Server failed to start:", error);
//     throw error;
//   }
// });

Before(async function ({ pickle }) {
  // UI test setup
  if (pickle.tags.some((tag) => tag.name === "@ui")) {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  // API test setup
  // try {
  //   if (this.apiContext) {
  //     testDataManager = new TestDataManager(this.apiContext);
  //     await testDataManager.setupTestData();
  //   }
  // } catch (error) {
  //   console.error("Error setting up test data:", error);
  //   throw error;
  // }
});

After(async function ({ pickle }) {
  // UI test cleanup
  if (pickle.tags.some((tag) => tag.name === "@ui")) {
    try {
      await this.context?.close(); // Close context first
      await this.browser?.close(); // Then close browser
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  }

  // // API test cleanup
  // if (testDataManager) {
  //   await testDataManager.cleanupTestData();
  // }
});

// AfterAll(async () => {
//   await server.stop();
// });
