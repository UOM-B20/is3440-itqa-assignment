const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const serverUtils = require("../support/server-utils");

setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
  await serverUtils.startServer();
  await serverUtils.init();
  await serverUtils.clearDatabase();
});

AfterAll(async () => {
  await serverUtils.shutdown();
});

Before(async function ({ pickle }) {
  // UI test setup
  if (pickle.tags.some((tag) => tag.name === "@ui")) {
    await this.closeUI();
    await this.initUI();
  }

  // API test setup
  if (pickle.tags.some((tag) => tag.name === "@api")) {
    await serverUtils.clearDatabase();
  }
});

After(async function ({ pickle }) {
  // UI test cleanup
  if (pickle.tags.some((tag) => tag.name === "@ui")) {
    await this.closeUI();
  }

  // API test cleanup
  if (pickle.tags.some((tag) => tag.name === "@api")) {
    await serverUtils.clearDatabase();
  }
});
