const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When(
  "I create a new book with title {string} and author {string}",
  async function (title, author) {
    const bookData = { title, author };
    const headers = {
      ...this.currentAuth,
    };

    this.response = await this.apiContext.post("/api/books", {
      data: bookData,
      headers,
    });
  }
);

Then(
  "the response status code for creating a book should be {int}",
  async function (statusCode) {
    expect(this.response.status()).toBe(statusCode);
  }
);

Then("the book details should match for admin:", async function (dataTable) {
  const expectedData = dataTable.hashes()[0];
  const responseData = await this.response.json();
  expect(responseData.title).toBe(expectedData.title);
  expect(responseData.author).toBe(expectedData.author);
});

Then("the created book should be present in the book list", async function () {
  const booksResponse = await this.apiContext.get("/api/books", {
    headers: this.currentAuth,
  });
  const books = await booksResponse.json();
  const createdBook = books.find(
    (book) => book.title === "Admin Book" && book.author === "Admin Author"
  );
  expect(createdBook).toBeDefined();
  expect(createdBook.title).toBe("Admin Book");
  expect(createdBook.author).toBe("Admin Author");
});
