const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given(
  "I am authenticated as {string} with password {string}",
  async function (username, password) {
    this.apiContext = await this.initAPI();
    const credentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    this.authHeader = `Basic ${credentials}`;
  }
);

When(
  "I send a {string} request to {string}",
  async function (method, endpoint) {
    const options = {
      headers: {
        Authorization: this.authHeader,
      },
    };
    this.response = await this.apiContext[method.toLowerCase()](
      endpoint,
      options
    );
  }
);

When(
  "I send a {string} request to {string} with body:",
  async function (method, endpoint, body) {
    const options = {
      headers: {
        Authorization: this.authHeader,
        "Content-Type": "application/json",
      },
      data: JSON.parse(body),
    };
    this.response = await this.apiContext[method.toLowerCase()](
      endpoint,
      options
    );
  }
);

Then(
  "the response should contain book details:",
  async function (expectedData) {
    const responseBody = await this.response.json();
    const expectedBody = JSON.parse(expectedData);
    expect(responseBody).toMatchObject(expectedBody);
  }
);
