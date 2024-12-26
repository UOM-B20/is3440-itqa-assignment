const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const serverUtils = require("../../support/server-utils");

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

When(
  "I have created a book with following details:",
  async function (dataTable) {
    const headers = {
      ...this.currentAuth,
    };

    const bookData = dataTable.hashes()[0];
    const { title, author } = bookData;

    this.response = await this.apiContext.post("/api/books", {
      data: { title, author },
      headers,
    });

    // Store the book ID immediately after creation
    if (this.response.ok()) {
      const responseData = await this.response.json();
      this.storedBookId = responseData.id;
      expect(this.storedBookId).toBeDefined();
    }
  }
);

Then("the response status code should be {int}", async function (statusCode) {
  expect(this.response.status()).toBe(statusCode);
});

Then("the book details should match:", async function (dataTable) {
  const expectedData = dataTable.hashes()[0];

  const responseData = await this.response.json();
  expect(responseData.title).toBe(expectedData.title);
  expect(responseData.author).toBe(expectedData.author);
});
