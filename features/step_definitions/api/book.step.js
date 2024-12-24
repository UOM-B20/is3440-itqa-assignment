const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

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

Then("the response should contain an empty list", async function () {
  const books = await this.response.json();
  expect(Array.isArray(books)).toBe(true);
  expect(books.length).toBe(0);
});

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

  if (responseData.id) {
    this.storedBookId = responseData.id;
    expect(this.storedBookId).toBeDefined();
  }
});
