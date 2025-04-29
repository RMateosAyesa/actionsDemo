const { expect } = require("@playwright/test");

class LoginPage {
  constructor(window) {
    this.window = window;
    this.initializeLocators();
  }

  initializeLocators() {
    this.usernameInput = this.window.locator('input[name="username"]');
    this.passwordInput = this.window.locator('input[name="password"]');
    this.loginButton = this.window.locator("button#kc-login");
    this.errorMessage = this.window.locator("#input-error");
    this.modalCloseButton = this.window.locator("button.ant-modal-close");
    this.dashboardHeader = this.window.locator(".devaid-background__header");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async closeModalIfVisible() {
    await this.window.waitForTimeout(3000);
    if (await this.modalCloseButton.isVisible()) {
      await this.modalCloseButton.click();
    }
  }

  async verifyLoginSuccess() {
    await this.window.waitForTimeout(1000);
    await expect(this.dashboardHeader).toBeVisible();
  }

  async verifyLoginFailure() {
    await expect(this.errorMessage).toBeVisible();
  }
}

module.exports = { LoginPage };
