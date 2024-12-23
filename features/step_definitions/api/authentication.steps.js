const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When(
  "I send a {string} request to {string} without authentication",
  async function (method, endpoint) {
    // Initialize API context if not already done
    if (!this.apiContext) {
      await this.initAPI();
    }

    switch (method.toUpperCase()) {
      case "GET":
        this.response = await this.apiContext.get(endpoint);
        break;
      case "POST":
        this.response = await this.apiContext.post(endpoint, {
          data: {
            title: "Test Book",
            author: "Test Author",
          },
        });
        break;
      case "PUT":
        this.response = await this.apiContext.put(endpoint, {
          data: {
            title: "Updated Book",
            author: "Updated Author",
          },
        });
        break;
      case "DELETE":
        this.response = await this.apiContext.delete(endpoint);
        break;
    }
  }
);

Then("the response status code should be {int}", async function (statusCode) {
  expect(this.response.status()).toBe(statusCode);
});
