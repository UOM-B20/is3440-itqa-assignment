const { When, Then } = require("@cucumber/cucumber");
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

  switch (method.toUpperCase()) {
    case "PUT":
      this.response = await this.api.put(finalEndpoint, data);
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

      this.response = await this.api.post("/api/books", requestData);

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

When("I try create a book with following details:", async function (dataTable) {
  let requestData = {};

  const bookData = dataTable.hashes()[0];

  if (bookData.title !== "<omit>") {
    requestData.title = bookData.title === "null" ? null : bookData.title;
  }

  if (bookData.author !== "<omit>") {
    requestData.author = bookData.author === "null" ? null : bookData.author;
  }

  this.response = await this.api.post("/api/books", requestData);
});

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

When(
  "the book library database has following book:",
  async function (dataTable) {
    const book = dataTable.hashes()[0];

    const body = {
      title: book.title,
      author: book.author,
    };

    expect(body.title).toBeDefined();
    expect(body.author).toBeDefined();
    expect(body.title.length).toBeGreaterThan(0);
    expect(body.author.length).toBeGreaterThan(0);

    this.response = await this.serverUtils.createBook(body);

    expect(this.response).toBeDefined();
    expect(this.response.status()).toBe(201);

    const responseData = await this.response.json();

    expect(responseData).toBeDefined();
    expect(responseData).toHaveProperty("id");
    expect(typeof responseData.id).toBe("number");

    this.storedBookId = responseData.id;
  }
);

When("I delete the book using stored id", async function () {
  const storedId = this.storedBookId;
  expect(storedId).toBeDefined();

  this.response = await this.api.delete(`/api/books/${storedId}`);
});

When(
  "I try to update the book using {string} with following details:",
  async function (id, dataTable) {
    // If id is {stored-id}, use storedBookId, otherwise parse the string as number
    const storedId =
      id === "{stored-id}" ? this.storedBookId : parseInt(id, 10);

    // Validate storedId
    expect(storedId).toBeDefined();
    expect(typeof storedId).toBe("number");
    expect(storedId).toBeGreaterThan(0);

    const data = dataTable.hashes()[0];

    const sanitizedData = {
      id: storedId,
      title: data.title,
      author: data.author,
    };

    expect(sanitizedData.title).toBeDefined();
    expect(sanitizedData.author).toBeDefined();
    expect(sanitizedData.title.length).toBeGreaterThan(0);
    expect(sanitizedData.author.length).toBeGreaterThan(0);

    this.response = await this.api.put(`/api/books/${storedId}`, sanitizedData);
  }
);

When("I try to retrieve the book with id:{string}", async function (id) {
  const storedId = id === "{stored-id}" ? this.storedBookId : parseInt(id, 10);

  expect(storedId).toBeDefined();
  expect(isNaN(storedId)).toBeFalsy();
  expect(storedId).toBeGreaterThan(0);

  this.response = await this.api.get(`/api/books/${storedId}`);
});

When("I try to retrieve all books", async function () {
  this.response = await this.api.get("/api/books");
});

When(
  "the book library database has following books:",
  async function (dataTable) {
    const books = dataTable.hashes();

    for (const book of books) {
      const body = {
        title: book.title,
        author: book.author,
      };

      expect(body.title).toBeDefined();
      expect(body.author).toBeDefined();
      expect(body.title.length).toBeGreaterThan(0);
      expect(body.author.length).toBeGreaterThan(0);

      this.response = await this.serverUtils.createBook(body);
    }
  }
);

Then(
  "the response should contain {int} records and book details should match:",
  async function (length, dataTable) {
    const expectedBooks = dataTable.hashes();

    expect(this.response).toBeDefined();
    expect(this.response.status()).toBe(200);

    const responseData = await this.response.json();

    expect(responseData).toBeDefined();
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length).toBe(length);

    for (let i = 0; i < length; i++) {
      const expectedBook = expectedBooks[i];
      const actualBook = responseData[i];

      expect(actualBook).toBeDefined();
      expect(actualBook).toHaveProperty("id");
      expect(actualBook).toHaveProperty("title");
      expect(actualBook).toHaveProperty("author");

      expect(actualBook.title).toBe(expectedBook.title);
      expect(actualBook.author).toBe(expectedBook.author);
    }
  }
);

When(
  "I try to update book with id:{string} and verify response:",
  async function (id, datatable) {
    const testcases = datatable.hashes(); //[{id: '1', title: 'new title', author: 'new author', status: 'success'/ 'fail', satusCode: '200'}]

    const storedId =
      id === "{stored-id}" ? this.storedBookId : parseInt(id, 10);

    for (const testcase of testcases) {
      let bodyId;
      switch (testcase.id) {
        case "{stored-id}":
          bodyId = this.storedBookId;
          break;
        case "null":
          bodyId = null;
          break;
        default:
          bodyId = parseInt(testcase.id, 10);
      }

      const data = {
        id: bodyId,
        title: testcase.title === "null" ? null : testcase.title.trim(),
        author: testcase.author === "null" ? null : testcase.author.trim(),
      };

      this.response = await this.api.put(`/api/books/${storedId}`, data);

      if (testcase.status === "success") {
        const statusCode = await this.response.status();
        //successful
        expect(statusCode).toBeGreaterThanOrEqual(200);
        expect(statusCode).toBeLessThan(300);
      } else {
        const statusCode = await this.response.status();
        expect(statusCode).toBeGreaterThanOrEqual(400);
        expect(statusCode).toBeLessThan(600);
      }

      if (testcase.statusCode) {
        const statusCode = await this.response.status();
        expect(statusCode).toBe(parseInt(testcase.statusCode, 10));
      }
    }
  }
);
