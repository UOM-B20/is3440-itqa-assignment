const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const serverUtils = require("../../support/server-utils");

Then("the response status code should be {int}", async function (statusCode) {
  expect(this.response.status()).toBe(statusCode);
});

Given("the book database is empty", async function () {
  const cleaned = await serverUtils.clearDatabase();
  expect(cleaned).toBe(true);
});

When(
  "I send a {string} request to {string}",
  async function (method, endpoint) {
    // Replace stored ID if present in endpoint
    const finalEndpoint = this.storedBookId
      ? endpoint.replace("{stored-id}", this.storedBookId)
      : endpoint;

    const headers = {
      ...this.currentAuth,
    };

    switch (method.toUpperCase()) {
      case "GET":
        this.response = await this.apiContext.get(finalEndpoint, {
          headers,
        });
        break;
      case "DELETE":
        this.response = await this.apiContext.delete(finalEndpoint, {
          headers,
        });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }
);
