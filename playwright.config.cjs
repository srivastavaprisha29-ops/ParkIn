const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  webServer: {
    command: "python3 -m http.server 8000 --bind 127.0.0.1",
    url: "http://127.0.0.1:8000",
    reuseExistingServer: false,
  },
});
