const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const serverUtils = require("../../support/server-utils");

Given("the book database is empty", async function () {
  const cleaned = await serverUtils.clearDatabase();
  expect(cleaned).toBe(true);
});

Given(
  "I authenticated as username {string} and password {string}",
  async function (username, password) {
    this.currentAuth = serverUtils.getAuthHeader(username, password);
  }
);

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
  "I have created a book with title {string} and author {string}",
  async function (title, author) {
    const headers = {
      ...this.currentAuth,
    };

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

When(
  "I send a {string} request to {string} with updated details:",
  async function (method, endpoint, docString) {
    const finalEndpoint = this.storedBookId
      ? endpoint.replace("{stored-id}", this.storedBookId)
      : endpoint;

    const data = JSON.parse(docString);

    // Replace {stored-id} with actual stored ID if present
    if (data.id && data.id === "{stored-id}" && this.storedBookId) {
      data.id = this.storedBookId;
    }

    const headers = {
      ...this.currentAuth,
    };

    switch (method.toUpperCase()) {
      case "PUT":
        this.response = await this.apiContext.put(finalEndpoint, {
          data,
          headers,
        });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }
);

Then("the response should contain an empty list", async function () {
  const books = await this.response.json();
  expect(Array.isArray(books)).toBe(true);
  expect(books.length).toBe(0);
});

Then(
  "the response should contain the created book details title {string} and author {string}",
  async function (expectedTitle, expectedAuthor) {
    const responseData = await this.response.json();
    expect(responseData.title).toBe(expectedTitle);
    expect(responseData.author).toBe(expectedAuthor);
  }
);

Then("I store the created book ID", async function () {
  const responseData = await this.response.json();
  this.storedBookId = responseData.id;
  expect(this.storedBookId).toBeDefined();
});
