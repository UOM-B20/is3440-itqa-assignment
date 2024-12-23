// features/support/server-utils.js
const { request } = require("@playwright/test");

const BASE_URL = "http://localhost:7081";

const AUTH = {
  admin: {
    username: "admin",
    password: "password",
  },
  user: {
    username: "user",
    password: "password",
  },
};

class ServerUtils {
  constructor() {
    this.apiContext = null;
  }

  async init() {
    if (!this.apiContext) {
      this.apiContext = await request.newContext({
        baseURL: BASE_URL,
      });
    }
  }

  getAuthHeader(userType = "admin") {
    const credentials = AUTH[userType];
    return {
      Authorization:
        "Basic " +
        Buffer.from(`${credentials.username}:${credentials.password}`).toString(
          "base64"
        ),
    };
  }

  async isDatabaseEmpty() {
    await this.init();
    const response = await this.apiContext.get("/api/books", {
      headers: this.getAuthHeader("admin"),
    });
    const books = await response.json();
    return response.ok() && Array.isArray(books) && books.length === 0;
  }

  async seedDatabase() {
    await this.init();
    const sampleBooks = [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
      { title: "To Kill a Mockingbird", author: "Harper Lee" },
      { title: "1984", author: "George Orwell" },
      { title: "Pride and Prejudice", author: "Jane Austen" },
      { title: "The Catcher in the Rye", author: "J.D. Salinger" },
    ];

    for (const book of sampleBooks) {
      await this.apiContext.post("/api/books", {
        headers: this.getAuthHeader("admin"),
        data: book,
      });
    }
  }

  async clearDatabase() {
    await this.init();
    const response = await this.apiContext.get("/api/books", {
      headers: this.getAuthHeader("admin"),
    });
    const books = await response.json();

    for (const book of books) {
      await this.apiContext.delete(`/api/books/${book.id}`, {
        headers: this.getAuthHeader("admin"),
      });
    }
  }

  async close() {
    if (this.apiContext) {
      await this.apiContext.dispose();
      this.apiContext = null;
    }
  }
}

module.exports = new ServerUtils();
