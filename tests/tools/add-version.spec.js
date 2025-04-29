const { describe, test, expect, _electron } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MainPage } = require("../../pages/MainPage");
const { ToolsPage } = require("../../pages/ToolsPage");
const { CredentialsPage } = require("../../pages/CredentialsPage");
const { appImage } = require('../../config');

describe("[Functional Test] Starter login", () => {
  //Variable declaration
  let electronApp = null;
  let window = null;
  let loginPage = null;
  let mainPage = null;
  let toolsPage = null;
  let credPage = null;

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
    toolsPage = new ToolsPage(window);
    credPage = new CredentialsPage(window);
  });

  // 3. Test implementation
  test.describe("When we create a new tool", () => {
    test("Should see the tool listed", async () => {
      await loginPage.login("managerqa", "managerqa");
      await loginPage.closeModalIfVisible();
      await loginPage.verifyLoginSuccess();

      await mainPage.navigateToNewTool();

      await toolsPage.createNewTool();

      await toolsPage.addToolVersion();
      await toolsPage.navigateToTool("QATestTool");
      await toolsPage.verifyNewToolVersion();

      await mainPage.navigateToToolsList();

      await toolsPage.searchTool("QATestTool");
      await credPage.deleteAllEntries();
    });
  });

  // 4. Electron close application
  test.afterEach(async () => {
    await electronApp.close();
  });
});
