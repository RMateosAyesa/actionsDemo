// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    headless: false, // run with GUI for Electron/Desktop app
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 100, // optional, helps debug flaky UI
    },
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
