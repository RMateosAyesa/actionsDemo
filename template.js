const { describe, test, expect, _electron } = require("@playwright/test");

describe("[Functional Test] Starter login", () => {
  // Variable declaration
  let electronApp = null;
  let window = null;

  // 1. Describe configuration
  describe.configure({ mode: "serial" });

  // 2. Electron configuration
  test.beforeEach(async () => {
    electronApp = await _electron.launch({
      executablePath: "./DevaidStarter_Dev-4.1.0.AppImage",
    });

    window = await electronApp.firstWindow();
    await window.waitForLoadState();
  });

  // 3. Test implementation
  describe("When we do stuff", () => {
    test("Should things happen", async () => {
      //Test 1 actions
    });
  });

  describe("When we do stuff", () => {
    test("Should things happen", async () => {
      //Test 2 actions
    });
  });

  // 4. Electron close application
  test.afterEach(async () => {
    await electronApp.close();
  });
});
