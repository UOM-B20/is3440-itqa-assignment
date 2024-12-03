const { Before, After } = require("@cucumber/cucumber");

Before(async function () {
  await this.setUp();
});

After(async function () {
  await this.tearDown();
});
