const { describe, test, _electron } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { CredentialsPage } = require("../../pages/CredentialsPage");
const { MainPage } = require("../../pages/MainPage");
const { appImage } = require('../../config');

describe("[Functional Test] Docker Credentials", () => {
  //Variable declaration
  let electronApp = null;
  let window = null;
  let loginPage = null;
  let mainPage = null;
  let credentialsPage = null;

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
    credentialsPage = new CredentialsPage(window);
  });

  // 3. Test implementation
  test.describe("When we enter correct Docker credentials", () => {
    test("We should see the list updated with the entered credentials", async () => {
      await loginPage.login("rmateosh", "rmateosh");
      await loginPage.closeModalIfVisible();

      await mainPage.navigateToCredentialsPage();
      await credentialsPage.navigateToDockerConfig();
      await credentialsPage.enterDockerCredentials(
        "TestUserQA",
        "TestPassWordQA"
      );
      await credentialsPage.deleteAllEntries();
      await credentialsPage.verifyDockerCredentialsSaved();
    });
  });

  test.describe("When we enter incorrect Docker data", () => {
    test("We should see error messages", async () => {
      await loginPage.login("rmateosh", "rmateosh");
      await loginPage.closeModalIfVisible();

      await mainPage.navigateToCredentialsPage();
      await credentialsPage.navigateToDockerConfig();
      await credentialsPage.enterEmptyDockerCredentials();
      await credentialsPage.verifyDockerErrors();
    });
  });

  // 4. Electron close application
  test.afterEach(async () => {
    await electronApp.close();
  });
});
