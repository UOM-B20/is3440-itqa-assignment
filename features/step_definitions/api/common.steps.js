const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const serverUtils = require("../../support/server-utils");

Then("the response status code should be {int}", async function (statusCode) {
  try {
    expect(this.response.status()).toBe(statusCode);
  } catch (error) {
    throw new Error(
      `Status Code Mismatch
       Expected: ${statusCode} 
       Received: ${this.response.status()}
      `.replace(/^\s+/gm, "")
    );
  }
});

Then("the response should be successful", async function () {
  expect(this.response.ok()).toBe(true);
});

Then("the response message should be {string}", async function (message) {
  const responseData = await this.response.text();

  expect(responseData).toBe(message);
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

    switch (method.toUpperCase()) {
      case "GET":
        this.response = await this.api.get(finalEndpoint);
        break;
      case "DELETE":
        this.response = await this.api.delete(finalEndpoint);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }
);

Then("the response should be unsuccessful", async function () {
  const status = this.response.status();

  expect(status).toBeGreaterThanOrEqual(400);
  expect(status).toBeLessThan(600);
});
