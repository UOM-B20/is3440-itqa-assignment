const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Then("the books list should be empty", async function () {
  const books = await this.response.json();
  expect(Array.isArray(books)).toBe(true);
  expect(books.length).toBe(0);
});

When("I update the book with:", async function (docString) {
  const endpoint = "/api/books/{stored-id}";
  const method = "PUT";

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
});

Then("I store the created book ID", async function () {
  const responseData = await this.response.json();

  if (responseData.id) {
    this.storedBookId = responseData.id;
    expect(this.storedBookId).toBeDefined();
  }
});