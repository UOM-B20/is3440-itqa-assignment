const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When(
  "I send a {string} request to {string} without authentication",
  async function (method, endpoint) {
    if (!this.apiRequest) {
      await this.initAPI();
    }

    switch (method.toUpperCase()) {
      case "GET":
        this.response = await this.apiRequest.get(endpoint);
        break;
      case "POST":
        this.response = await this.apiRequest.post(endpoint, {
          data: {
            title: "Test Book",
            author: "Test Author",
          },
        });
        break;
      case "PUT":
        this.response = await this.apiRequest.put(endpoint, {
          data: {
            title: "Updated Book",
            author: "Updated Author",
          },
        });
        break;
      case "DELETE":
        this.response = await this.apiRequest.delete(endpoint);
        break;
    }
  }
);

Then("the response status code should be {int}", async function (statusCode) {
  expect(this.response.status()).toBe(statusCode);
});
