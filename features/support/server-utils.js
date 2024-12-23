const { request } = require("@playwright/test");
const { spawn } = require("child_process");
const path = require("path");

const BASE_URL = "http://localhost:7081";

class ServerUtils {
  constructor() {
    this.apiContext = null;
    this.serverProcess = null;
    this.BASE_URL = BASE_URL;
  }

  async startServer() {
    const jarPath = path.join(
      __dirname,
      "../../server/demo-0.0.1-SNAPSHOT.jar"
    );
    this.serverProcess = spawn("java", ["-jar", jarPath]);
    await this.waitForServer();
  }

  async waitForServer() {
    const maxAttempts = 10;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        await fetch(this.BASE_URL + "/api/books");
        return;
      } catch (e) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
    throw new Error("Server failed to start");
  }

  async init() {
    if (!this.apiContext) {
      this.apiContext = await request.newContext({
        baseURL: this.BASE_URL,
      });
    }
  }

  getAuthHeader(username, password) {
    return {
      Authorization:
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    };
  }

  async isDatabaseEmpty() {
    await this.init();
    const response = await this.apiContext.get("/api/books", {
      headers: this.getAuthHeader("admin", "password"),
    });
    const books = await response.json();
    return response.ok() && Array.isArray(books) && books.length === 0;
  }

  async seedDatabase(count = 5) {
    await this.init();

    const validCount = Math.min(Math.max(parseInt(count) || 5, 1), 5);

    const sampleBooks = [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
      { title: "To Kill a Mockingbird", author: "Harper Lee" },
      { title: "1984", author: "George Orwell" },
      { title: "Pride and Prejudice", author: "Jane Austen" },
      { title: "The Catcher in the Rye", author: "J.D. Salinger" },
    ];

    const booksToSeed = sampleBooks.slice(0, validCount);

    for (const book of booksToSeed) {
      const res = await this.apiContext.post("/api/books", {
        headers: this.getAuthHeader("admin", "password"),
        data: book,
      });

      if (!res.ok()) {
        throw new Error("Failed to seed database");
      }
    }
  }

  async clearDatabase() {
    if (!this.apiContext) {
      await this.init();
    }

    // Get initial books
    const response = await this.apiContext.get("/api/books", {
      headers: this.getAuthHeader("admin", "password"),
    });

    if (!response.ok()) {
      throw new Error("Failed to get initial books");
    }
    const books = await response.json();

    // Delete each book
    for (const book of books) {
      const res = await this.apiContext.delete(`/api/books/${book.id}`, {
        headers: this.getAuthHeader("user", "password"),
      });

      if (!res.ok()) {
        throw new Error(`Failed to delete book ${book.id}`);
      }
    }
  }

  async verfiyBookWithId(number) {
    if (!this.apiContext) {
      await this.init();
    }
    const response = await this.apiContext.get(`/api/books/${number}`, {
      headers: this.getAuthHeader("admin", "password"),
    });

    if (response.ok()) {
      return true;
    }

    return false;
  }

  async close() {
    if (this.apiContext) {
      await this.apiContext.dispose();
      this.apiContext = null;
    }
  }

  async shutdown() {
    await this.close();
    if (this.serverProcess) {
      this.serverProcess.kill();
      this.serverProcess = null;
    }
  }
}

module.exports = new ServerUtils();
