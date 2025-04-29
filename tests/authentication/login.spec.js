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
    const fs = require('fs');
    console.log('App path:', appImage);
    console.log('Exists:', fs.existsSync(appImage));

    electronApp = await _electron.launch({
        executablePath: appImage,
        args: ['--no-sandbox'],
        timeout: 60000
    });

    if (!electronApp) {
      throw new Error(`Electron app failed to launch using path: ${appImage}`);
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
