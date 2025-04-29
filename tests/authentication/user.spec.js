const { describe, test, _electron } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { MainPage } = require("../../pages/MainPage");
const { appImage } = require('../../config');

describe("[Functional Test] Starter login", () => {
  //Variable declaration
  let electronApp = null;
  let window = null;
  let loginPage = null;
  let mainPage = null;

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
  });

  // 3. Test implementation
  const roles = [
    { name: "Developer", username: "devqa", password: "devqa" },
    { name: "Admin", username: "adminqa", password: "adminqa" },
    { name: "Manager", username: "managerqa", password: "managerqa" },
  ];

  roles.forEach(({ name, username, password }) => {
    test.describe(`When we log in as ${name}`, () => {
      test(`We should see the associated menu options`, async () => {
        await loginPage.login(username, password);
        await loginPage.closeModalIfVisible();
        await mainPage.verifyMenuForRole(name);
      });
    });
  });

  // 4. Electron close application
  test.afterEach(async () => {
    await electronApp.close();
  });
});
