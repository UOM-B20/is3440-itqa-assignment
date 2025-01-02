const {
  Before,
  After,
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
} = require("@cucumber/cucumber");
const serverUtils = require("./server-utils");

setDefaultTimeout(60 * 1000);

BeforeAll({ tags: "@api" }, async function () {
  await serverUtils.startServer();
});

AfterAll({ tags: "@api" }, async function () {
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
    await this.reset();
    await this.initAPI();
  }
});

After(async function ({ pickle }) {
  // UI test cleanup
  if (pickle.tags.some((tag) => tag.name === "@ui")) {
    await this.closeUI();
  }

  // API test cleanup
  if (pickle.tags.some((tag) => tag.name === "@api")) {
    await this.closeAPI();
    await serverUtils.clearDatabase();
  }
});
