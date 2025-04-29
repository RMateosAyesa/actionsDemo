const { describe, test, expect, _electron } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MainPage } = require("../../pages/MainPage");
const { ComponentsPage } = require("../../pages/ComponentsPage");
const { appImage } = require('../../config');

describe("[Functional Test] Starter login", () => {
  //Variable declaration
  let electronApp = null;
  let window = null;
  let loginPage = null;
  let mainPage = null;
  let componentsPage = null;

  // 1. Describe configuration
  test.describe.configure({ mode: "serial" });

  // 2. Electron configuration
  test.beforeEach(async () => {
    electronApp = await _electron.launch({
        executablePath: appImage,
    });

    window = await electronApp.firstWindow();
    await window.waitForLoadState();
    loginPage = new LoginPage(window);
    mainPage = new MainPage(window);
    componentsPage = new ComponentsPage(window);
  });

  // 3. Test implementation
  test.describe("When I open the component list", () => {
    test("We should see the complete list of components", async () => {
      await loginPage.login("managerqa", "managerqa");
      await loginPage.closeModalIfVisible();
      await loginPage.verifyLoginSuccess();

      await mainPage.navigateToComponentList();

      await componentsPage.verifyComponentsAreListed();
    });
  });

  // 4. Electron close application
  test.afterEach(async () => {
    await electronApp.close();
  });
});
