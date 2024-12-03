const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const ServerManager = require("../../../utils/server-manager");
const TestDataManager = require("../../../utils/seed-test-data");

// Increase timeout to 30 seconds
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

Before(async function () {
  if (this.apiContext) {
    testDataManager = new TestDataManager(this.apiContext);
    await testDataManager.setupTestData();
  }
});

After(async function () {
  if (testDataManager) {
    await testDataManager.cleanupTestData();
  }
});

AfterAll(async () => {
  await server.stop();
});
