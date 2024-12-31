const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I create a book with invalid data:", async function (dataTable) {
  const headers = {
    ...this.currentAuth,
  };

  try {
    const bookData = dataTable.hashes()[0];
    const { title, author } = bookData;

    const data = {};
    if (title !== undefined && title !== "") data.title = title;
    if (author !== undefined && author !== "") data.author = author;

    this.response = await this.apiContext.post("/api/books", {
      data,
      headers,
      failOnStatusCode: false,
    });

    if (this.response.status() === 400) {
      const errorResponse = await this.response.json();
      expect(errorResponse.error).toBeDefined();
    } else {
      throw new Error(
        `Expected 400 error for invalid data, but got ${this.response.status()}`
      );
    }
  } catch (error) {
    console.error("Error creating book with invalid data:", error);
    throw error;
  }
});

Then("the books list should be empty", async function () {
  try {
    const responseData = await this.response.json();
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length).toBe(0);
  } catch (error) {
    console.error("Error checking empty books list:", error);
    throw error;
  }
});

When("I update the book with:", async function (docString) {
  const endpoint = "/api/books/{stored-id}";
  const method = "PUT";

  const finalEndpoint = this.storedBookId
    ? endpoint.replace("{stored-id}", this.storedBookId)
    : endpoint;

  const data = JSON.parse(docString);

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
  const responseString = await this.response.text();

  try {
    const responseData = JSON.parse(responseString);

    if (responseData.id) {
      this.storedBookId = responseData.id;
      expect(this.storedBookId).toBeDefined();
    }
  } catch (error) {
    console.error("Error storing book ID:", error);
    throw error;
  }
});

When(
  "I have created a book with following details:",
  async function (dataTable) {
    const headers = {
      ...this.currentAuth,
    };

    let requestData = {};

    try {
      const bookData = dataTable.hashes()[0];

      if (bookData.title !== "<omit>") {
        requestData.title = bookData.title === "null" ? null : bookData.title;
      }

      if (bookData.author !== "<omit>") {
        requestData.author =
          bookData.author === "null" ? null : bookData.author;
      }

      this.response = await this.apiContext.post("/api/books", {
        data: requestData,
        headers,
        failOnStatusCode: false,
      });

      if (this.response.status() === 201) {
        const responseData = await this.response.json();
        this.storedBookId = responseData.id;
        expect(this.storedBookId).toBeDefined();
        expect(typeof this.storedBookId).toBe("number");
      } else {
        throw new Error(
          `Failed to create book. Status code: ${this.response.status()}`
        );
      }
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  }
);

Then("the book details should match:", async function (dataTable) {
  try {
    const expectedData = dataTable.hashes()[0];
    const responseData = await this.response.json();
    expect(responseData).toBeDefined();
    expect(responseData).toHaveProperty("id");
    expect(responseData).toHaveProperty("title");
    expect(responseData).toHaveProperty("author");
    expect(responseData.title).toBe(expectedData.title);
    expect(responseData.author).toBe(expectedData.author);
    expect(typeof responseData.id).toBe("number");
    expect(typeof responseData.title).toBe("string");
    expect(typeof responseData.author).toBe("string");
    expect(responseData.title.length).toBeGreaterThan(0);
    expect(responseData.author.length).toBeGreaterThan(0);
  } catch (error) {
    console.error("Error validating book details:", error);
    throw error;
  }
});

Given("the book catalog is empty", async function () {
  const cleaned = await serverUtils.clearDatabase();
  expect(cleaned).toBe(true);
});

When(
  "I attempt to remove book with ID {int} from catalog",
  async function (bookId) {
    //VALIDATE BOOK ID
    expect(bookId).toBeGreaterThan(0);

    const endpoint = `/api/books/${bookId}`;

    this.response = await this.api.delete(endpoint);
  }
);

Given("the following books exists in the catalog:", async function (dataTable) {
  // CONVERT INTO OBJECT ARRAY
  const books = dataTable.hashes();

  // LOOP THROUGH EACH BOOK
  for (const book of books) {
    // VALIDATE EACH BOOK HAS FOLLOWING PROPERTIES
    expect(book).toHaveProperty("title");
    expect(book).toHaveProperty("author");
    expect(book).toHaveProperty("id");

    //CREATE A BOOK WITH THIS DETAILS (WE KNOW IT WILL BE CREATED, OR OVERWRITE IF EXISTS)
    const createdBook = await this.serverUtils.createBook(book);

    // VALIDATE BOOK IS CREATED
    expect(createdBook).toBeDefined();
  }
});
