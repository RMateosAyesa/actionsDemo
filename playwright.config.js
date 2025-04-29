const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  workers: 1, // 👈 run all tests sequentially
  reporter: 'html',
  timeout: 30000, // optional: extend default timeout if needed
});
