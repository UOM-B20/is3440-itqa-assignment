const { spawn } = require("child_process");
const path = require("path");

class ServerManager {
  async start() {
    const jarPath = path.join(
      __dirname,
      "../../server/demo-0.0.1-SNAPSHOT.jar"
    );
    this.serverProcess = spawn("java", ["-jar", jarPath]);

    return this.waitForServer();
  }

  async waitForServer() {
    const maxAttempts = 10;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        await fetch("http://localhost:7081/api/books");
        return;
      } catch (e) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
    throw new Error("Server failed to start");
  }

  async stop() {
    if (this.serverProcess) {
      this.serverProcess.kill();
    }
  }
}

module.exports = ServerManager;
