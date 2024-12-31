const { request } = require("@playwright/test");

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.context = null;
    this.currentAuth = null;
  }

  async init() {
    this.context = await request.newContext({
      baseURL: this.baseURL,
      storageState: undefined,
    });
  }

  setAuth(username, password) {
    this.currentAuth = {
      Authorization:
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    };
  }

  async get(endpoint) {
    if (!this.context) await this.init();

    const config = {
      headers: this.currentAuth,
    };

    return await this.context.get(endpoint, config);
  }

  async post(endpoint, data) {
    if (!this.context) await this.init();

    const config = {
      headers: this.currentAuth,
    };

    if (data) {
      config.data = data;
    }

    return await this.context.post(endpoint, config);
  }

  async put(endpoint, data) {
    if (!this.context) await this.init();

    const config = {
      headers: this.currentAuth,
    };

    if (data) {
      config.data = data;
    }

    return await this.context.put(endpoint, config);
  }

  async delete(endpoint) {
    if (!this.context) await this.init();

    const config = {
      headers: this.currentAuth,
    };

    return await this.context.delete(endpoint, config);
  }

  async dispose() {
    if (this.context) {
      await this.context.dispose();
      this.context = null;
    }
  }
}

module.exports = ApiClient;
