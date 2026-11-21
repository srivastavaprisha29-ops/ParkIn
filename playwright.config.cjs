const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  use: {
    launchOptions: { executablePath: process.env.PARKIN_CHROMIUM || undefined },
  },
  testDir: "./tests",
  webServer: {
    command: "python3 -m http.server 8000 --bind 127.0.0.1",
    url: "http://127.0.0.1:8000",
    reuseExistingServer: false,
  },
});
