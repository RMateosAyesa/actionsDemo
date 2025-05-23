const { describe, test, expect, _electron } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { appImage } = require('../../config');

describe("[Functional Test] Starter login", () => {
  //Variable declaration
  let electronApp = null;
  let window = null;
  let loginPage = null;

  // 1. Describe configuration
  test.describe.configure({ mode: "serial" });

  // 2. Electron configuration
  test.beforeEach(async () => {
    try {
      electronApp = await _electron.launch({
        args: [
          appImage,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-software-rasterizer'
  ]
      });
    } catch (error) {
      console.error("Error launching Electron app:", error);
      throw error; // Re-lanzamos para no ocultar el fallo
    }

    window = await electronApp.firstWindow();
    await window.waitForLoadState();
    loginPage = new LoginPage(window);
  });

  // 3. Test implementation
  test.describe("When the user credentials are valid", () => {
    test("Should open the starter dashboard", async () => {
      await loginPage.login("rmateosh", "rmateosh");
      await loginPage.closeModalIfVisible();
      await loginPage.verifyLoginSuccess();
    });
  });

  test.describe("When the user credentials are not valid", () => {
    test("Should show an authentication error", async () => {
      await loginPage.login("ErrorUser", "ErrorPass");
      await loginPage.verifyLoginFailure();
    });
  });

  // 4. Electron close application
  test.afterEach(async () => {
    if (electronApp) {
      await electronApp.close();
    }
  });  
});
