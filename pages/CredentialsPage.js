const { expect } = require("@playwright/test");

class CredentialsPage {
  constructor(window) {
    this.window = window;
    this.initializeLocators();
  }

  initializeLocators() {
    this.dockerOption = this.window.locator('div[data-node-key="docker"]');
    this.newButton = this.window.locator("button", { hasText: "Nuevo" });
    this.nameInput = this.window.locator("input#name");
    this.urlInput = this.window.locator("input#url");
    this.tokenTextarea = this.window.locator("textarea#token");
    this.gitSaveButton = this.window.locator('button[form="user-git-config-form"]');
    this.registryDropdown = this.window.locator("#id");
    this.registryOption = this.window.locator('div[title="Registry Proxya"]');
    this.userInput = this.window.locator("#user");
    this.passwordInput = this.window.locator("#pass");
    this.dockerSaveButton = this.window.locator(
      'button[form="user-docker-config-form"]'
    );
    this.selectAllCheckbox = this.window.locator('input[aria-label="Select all"]');
    this.confirmButton = this.window.locator("#PopConfirmContainer").nth(0);
    this.deleteButton = this.window.locator("button.ant-btn-sm").nth(1);
    this.emptyMessage = this.window.locator(".ant-empty-description");
    this.idError = this.window.locator("#id_help");
    this.userError = this.window.locator("#user_help");
    this.passError = this.window.locator("#pass_help");
    this.nameError = this.window.locator("#name_help");
    this.urlError = this.window.locator("#url_help");
    this.tokenError = this.window.locator("#token_help");
  }

  async navigateToDockerConfig() {
    await this.window.waitForTimeout(3000);
    await this.dockerOption.click();
  }

  async enterDockerCredentials(username, password) {
    await this.newButton.click();
    await this.window.waitForTimeout(1000);
    await this.registryDropdown.click();
    await this.registryOption.click();
    await this.userInput.fill(username);
    await this.passwordInput.fill(password);
    await this.dockerSaveButton.click();
  }

  async enterEmptyDockerCredentials() {
    await this.newButton.click();
    await this.window.waitForTimeout(1000);
    await this.dockerSaveButton.click();
  }

  async deleteAllEntries() {
    await this.selectAllCheckbox.click();
    await this.confirmButton.click();
    await this.deleteButton.click();
  }

  async verifyDockerCredentialsSaved() {
    await expect(this.emptyMessage).toBeVisible();
  }

  async verifyDockerErrors() {
    await expect(this.idError).toBeVisible();
    await expect(this.userError).toBeVisible();
    await expect(this.passError).toBeVisible();
  }

  async navigateToGitConfig() {
    await this.newButton.click();
    await this.window.waitForTimeout(1000);
  }

  async enterGitHubCredentials(name, url, token) {
    await this.nameInput.fill(name);
    await this.urlInput.fill(url);
    await this.tokenTextarea.fill(token);
    await this.gitSaveButton.click();
  }

  async verifyGitCredentialsSaved() {
    await expect(this.emptyMessage).toBeVisible();
  }

  async enterEmptyGitCredentials() {
    await this.gitSaveButton.click();
  }

  async verifyGitErrors() {
    await expect(this.nameError).toBeVisible();
    await expect(this.urlError).toBeVisible();
    await expect(this.tokenError).toBeVisible();
  }
}

module.exports = { CredentialsPage };
