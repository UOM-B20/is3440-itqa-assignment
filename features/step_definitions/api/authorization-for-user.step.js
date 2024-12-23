const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

// Background steps
Given("the book database is empty", async function () {
  // Assuming there's an endpoint to clear the database
  if (!this.apiContext) {
    await this.initAPI();
  }
  await this.apiContext.delete("/api/books/all");
});

Given("I have basic authentication credentials", async function (dataTable) {
  const credentials = dataTable.hashes()[0];
  this.authCredentials = {
    username: credentials.username,
    password: credentials.password,
  };
});

Given("I am authenticated as user", async function () {
  if (!this.apiContext) {
    await this.initAPI();
  }
  // Set up basic auth
  this.apiContext.setDefaultNavigationTimeout(10000);
  await this.apiContext.setExtraHTTPHeaders({
    Authorization:
      "Basic " +
      Buffer.from(
        `${this.authCredentials.username}:${this.authCredentials.password}`
      ).toString("base64"),
  });
});

Given("a book exists with id {string}", async function (id) {
  // Create a test book
  const response = await this.apiContext.post("/api/books", {
    data: {
      title: "Test Book",
      author: "Test Author",
    },
  });
  expect(response.status()).toBe(201);
});

// When steps for different requests
When(
  "I send a {string} request to {string} with body:",
  async function (method, endpoint, docString) {
    const requestBody = JSON.parse(docString);

    switch (method.toUpperCase()) {
      case "POST":
        this.response = await this.apiContext.post(endpoint, {
          data: requestBody,
        });
        break;
      case "PUT":
        this.response = await this.apiContext.put(endpoint, {
          data: requestBody,
        });
        break;
    }
  }
);

When(
  "I send a {string} request to {string}",
  async function (method, endpoint) {
    switch (method.toUpperCase()) {
      case "GET":
        this.response = await this.apiContext.get(endpoint);
        break;
      case "DELETE":
        this.response = await this.apiContext.delete(endpoint);
        break;
    }
  }
);

// Then steps for response validation
Then("the response should contain:", async function (dataTable) {
  const expectedData = dataTable.hashes()[0];
  const responseBody = await this.response.json();

  // Verify each field except id (since it's dynamic)
  if (expectedData.title) expect(responseBody.title).toBe(expectedData.title);
  if (expectedData.author)
    expect(responseBody.author).toBe(expectedData.author);
  // Verify id exists but don't check specific value
  expect(responseBody.id).toBeDefined();
});

Then("the response should contain error for id {string}", async function (id) {
  const responseBody = await this.response.json();
  expect(responseBody).toHaveProperty("id", parseInt(id));
});

// Reuse existing status code check step from authentication.steps.js
// Then("the response status code should be {int}"...)
