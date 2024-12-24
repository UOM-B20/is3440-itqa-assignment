const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

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

Then("the response should contain an empty list", async function () {
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

Then("the book details should match:", async function (dataTable) {
  const expectedData = dataTable.hashes()[0];

  const responseData = await this.response.json();
  expect(responseData.title).toBe(expectedData.title);
  expect(responseData.author).toBe(expectedData.author);
});

Then("I store the created book ID", async function () {
  const responseData = await this.response.json();

  if (responseData.id) {
    this.storedBookId = responseData.id;
    expect(this.storedBookId).toBeDefined();
  }
});
