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

    const bookData = dataTable.hashes()[0];
    let requestData = {};

    // Handle title
    if (bookData.title !== "<omit>") {
      if (bookData.title === "null") {
        bookData.title = null;
      }
      requestData.title = bookData.title;
    }

    // Handle author
    if (bookData.author !== "<omit>") {
      if (bookData.author === "null") {
        bookData.author = null;
      }
      requestData.author = bookData.author;
    }

    this.response = await this.apiContext.post("/api/books", {
      data: requestData,
      headers,
    });

    // Store the book ID immediately after creation
    if (this.response.ok() && this.response.status() === 201) {
      const responseData = await this.response.json();
      this.storedBookId = responseData.id;
      expect(this.storedBookId).toBeDefined();
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
