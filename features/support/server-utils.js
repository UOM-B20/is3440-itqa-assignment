const { request } = require("@playwright/test");
const { spawn, exec } = require("child_process");
const path = require("path");
const util = require("util");
const execAsync = util.promisify(exec);

const BASE_URL = "http://localhost:7081";
const PORT = 7081;
const STARTUP_TIMEOUT = 15000;

class ServerUtils {
  constructor() {
    this.apiContext = null;
    this.serverProcess = null;
    this.BASE_URL = BASE_URL;
  }

  async killProcessOnPort() {
    try {
      if (process.platform === "win32") {
        const { stdout } = await execAsync(`netstat -ano | findstr :${PORT}`);
        const lines = stdout.split("\n");
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          if (parts.length > 4 && parts[1].includes(`${PORT}`)) {
            await execAsync(`taskkill /F /PID ${parts[parts.length - 1]}`);
          }
        }
      } else {
        const { stdout } = await execAsync(`lsof -i :${PORT} -t`);
        if (stdout.trim()) {
          await execAsync(`kill -9 ${stdout.trim()}`);
        }
      }
    } catch (error) {
      // Ignore errors - process might not exist
    }
  }

  async startServer() {
    const jarPath = path.join(
      __dirname,
      "../../server/demo-0.0.1-SNAPSHOT.jar"
    );
    try {
      this.serverProcess = spawn("java", ["-jar", jarPath], {
        stdio: "ignore",
      });

      // Wait for server to be ready
      await this.waitForServerV2();
    } catch (error) {
      // If server start fails, try cleanup and restart once
      await this.killProcessOnPort();
      await this.shutdown();

      // One more attempt after cleanup
      this.serverProcess = spawn("java", ["-jar", jarPath], {
        stdio: "ignore",
      });
      await this.waitForServerV2();
    }
  }

  async isPortOpen() {
    return new Promise((resolve) => {
      const net = require("net");
      const client = new net.Socket();

      const onError = () => {
        client.destroy();
        resolve(false);
      };

      client.setTimeout(500);
      client.once("error", onError);
      client.once("timeout", onError);

      client.connect(PORT, "localhost", () => {
        client.destroy();
        resolve(true);
      });
    });
  }

  async waitForServer() {
    const startTime = Date.now();

    while (Date.now() - startTime < STARTUP_TIMEOUT) {
      const context = await request.newContext({
        baseURL: this.BASE_URL,
        storageState: undefined,
      });

      try {
        const response = await context.get("/api/books", {
          headers: this.getAuthHeader("admin", "password"),
          timeout: 500,
        });

        if (response.ok()) {
          return;
        }
      } catch {
        // Ignore error and continue polling
      } finally {
        await context.dispose();
      }

      // Quick check if the process has died
      if (this.serverProcess && this.serverProcess.exitCode !== null) {
        throw new Error("Server process terminated unexpectedly");
      }

      await new Promise((r) => setTimeout(r, 100));
    }

    throw new Error(`Server failed to start within ${STARTUP_TIMEOUT}ms`);
  }

  async waitForServerV2() {
    const startTime = Date.now();

    while (Date.now() - startTime < STARTUP_TIMEOUT) {
      // First check if port is open
      if (await this.isPortOpen()) {
        return; // Server is accepting connections
      }

      // Quick check if the process has died
      if (this.serverProcess && this.serverProcess.exitCode !== null) {
        throw new Error("Server process terminated unexpectedly");
      }

      await new Promise((r) => setTimeout(r, 100));
    }

    throw new Error(`Server failed to start within ${STARTUP_TIMEOUT}ms`);
  }

  async shutdown() {
    if (this.serverProcess) {
      this.serverProcess.kill("SIGKILL");
      this.serverProcess = null;
      await this.killProcessOnPort(); // Ensure cleanup
    }
  }

  getAuthHeader(username, password) {
    return {
      Authorization:
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    };
  }

  async isDatabaseEmpty() {
    const context = await request.newContext({
      baseURL: this.BASE_URL,
      storageState: undefined,
    });

    try {
      const response = await context.get("/api/books", {
        headers: this.getAuthHeader("admin", "password"),
      });
      const books = await response.json();
      return response.ok() && Array.isArray(books) && books.length === 0;
    } finally {
      await context.dispose();
    }
  }

  async seedDatabase(count = 5) {
    const context = await request.newContext({
      baseURL: this.BASE_URL,
      storageState: undefined,
    });

    try {
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
        await context.post("/api/books", {
          headers: this.getAuthHeader("admin", "password"),
          data: book,
        });
      }
    } finally {
      await context.dispose();
    }
  }

  async clearDatabase() {
    const context = await request.newContext({
      baseURL: this.BASE_URL,
      storageState: undefined,
    });

    try {
      const response = await context.get("/api/books", {
        headers: this.getAuthHeader("admin", "password"),
      });

      if (response.ok()) {
        const books = await response.json();
        for (const book of books) {
          await context.delete(`/api/books/${book.id}`, {
            headers: this.getAuthHeader("user", "password"),
          });
        }
      }
    } finally {
      await context.dispose();
    }
  }

  async hasBookWithId(id) {
    const context = await request.newContext({
      baseURL: this.BASE_URL,
      storageState: undefined,
    });

    try {
      const response = await context.get(`/api/books/${id}`, {
        headers: this.getAuthHeader("admin", "password"),
      });
      return response.status() === 200;
    } finally {
      await context.dispose();
    }
  }
}

module.exports = new ServerUtils();
