class TestDataManager {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.adminAuth = Buffer.from("admin:password").toString("base64");
  }

  async setupTestData() {
    const testBooks = [
      { id: 1, title: "Test Book 1", author: "Author 1" },
      { id: 2, title: "Test Book 2", author: "Author 2" },
      { id: 3, title: "Test Book 3", author: "Author 3" },
      { id: 4, title: "Test Book 4", author: "Author 4" },
      { id: 5, title: "Test Book 5", author: "Author 5" },
    ];

    for (const book of testBooks) {
      await this.apiContext.post("/api/books", {
        headers: {
          Authorization: `Basic ${this.adminAuth}`,
          "Content-Type": "application/json",
        },
        data: book,
      });
    }
  }

  async cleanupTestData() {
    const response = await this.apiContext.get("/api/books", {
      headers: { Authorization: `Basic ${this.adminAuth}` },
    });

    const books = await response.json();
    for (const book of books) {
      await this.apiContext.delete(`/api/books/${book.id}`, {
        headers: { Authorization: `Basic ${this.adminAuth}` },
      });
    }
  }
}

module.exports = TestDataManager;
