const { expect } = require("@playwright/test");

class MainPage {
  constructor(window) {
    this.window = window;
    this.initializeLocators();
  }

  initializeLocators() {
    this.developerMenu = this.window.locator('[href="/components"]');
    this.adminMenu = this.window.locator('[href="/configuration"]');
    this.managerMenu = this.window
      .locator('[href="/admin/create-local-tool"]')
      .first();
    this.userDropdown = this.window.locator("span.userResponsive");
    this.userConfigLink = this.window.locator(
      '[href="/user-configuration?id=&isDrawerOpen=false&tab=git"]'
    );
    this.toolsListButton = this.window.locator('[href="/admin/tools"]').first();
    this.newToolButton = this.window.locator(".dockerItem");
    this.componentListButton = this.window.locator('[href="/admin/infrastructure-components-list"]').first();
    this.newComponentButton = this.window.locator('[href="/admin/infrastructure-component"]');
}

  async navigateToCredentialsPage() {
    await this.userDropdown.click();
    await this.userConfigLink.click();
  }

  async verifyMenuForRole(role) {
    let expectedElement;
    switch (role) {
      case "Developer":
        expectedElement = this.developerMenu;
        break;
      case "Admin":
        expectedElement = this.adminMenu;
        break;
      case "Manager":
        expectedElement = this.managerMenu;
        break;
      default:
        throw new Error("Invalid role provided");
    }

    await expect(expectedElement).toBeVisible();
  }

  async navigateToToolsList() {
    await this.toolsListButton.click();
  }

  async navigateToNewTool() {
    await this.newToolButton.click();
  }

  async navigateToComponentList() {
    await this.componentListButton.click();
  }

  async navigateToNewComponent() {
    await this.newComponentButton.click();
  }
}

module.exports = { MainPage };
