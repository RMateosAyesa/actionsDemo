import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000, // Increased timeout
  workers: 1, // Reduce to 1 worker for stability
  retries: 1, // Add retries for flaky tests
  reporter: 'html',
  use: {
    headless: false, // Required for Electron
    trace: 'on-first-retry',
    launchOptions: {
      executablePath: process.env.ELECTRON_APP_PATH,
      args: ['--no-sandbox'] // Important for CI environments
    }
  }
});