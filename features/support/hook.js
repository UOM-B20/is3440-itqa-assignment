const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(60 * 1000);

Before(async function ({ pickle }) {
  // UI test setup
  if (pickle.tags.some((tag) => tag.name === "@ui")) {
    await this.closeUI();
    await this.initUI();
  }

  // API test setup
  if (pickle.tags.some((tag) => tag.name === "@api")) {
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
  }
});
