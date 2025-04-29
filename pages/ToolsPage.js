const { expect } = require("@playwright/test");

class ToolsPage {
  constructor(window) {
    this.window = window;
    this.initializeLocators();
  }

  initializeLocators() {
    this.toolListRow = this.window.locator(".ant-table-row");
    this.newToolName = this.window.locator("#name");
    this.newConfigTypeDropbox = this.window.locator("#configurationType");
    this.toolConfigPostman = this.window.locator('[title="Postman"]');
    this.toolConfigDbeaver = this.window.locator('[title="Dbeaver"]');
    this.toolConfigEclipse = this.window.locator('[title="Eclipse"]');
    this.executionTypeDropbox = this.window.locator("#executionType");
    this.toolExecutionConsole = this.window.locator('[title="Interfaz de consola"]');
    this.toolExecutionGraphic = this.window.locator('[title="Interfaz gráfica"]');
    this.toolExecutionBrowser = this.window.locator(
      '[title="Interfaz de navegador"]'
    );
    this.versionInput = this.window.locator("#add-version");
    this.installCode = this.window.locator("#installationCode");
    this.execCode = this.window.locator("#execCode");
    this.saveButton = this.window.locator('[type="submit"]');
    this.successNotification = this.window.locator(".ant-notification-topRight");
    this.listSearchBox = this.window.locator('span.ant-input-affix-wrapper > input[type=search]').last();
    this.addVersion = this.window.locator(".ant-btn-default").first();
    this.versionRow = this.window.locator(".ant-table-row-level-0");
    this.seeToolButton = this.window
      .locator("a", { hasText: "Ver herramienta" })
      .last();
    this.toolNameError = this.window.locator("#name_help");
    this.execTypeError = this.window.locator("#executionType_help");
    this.versionError = this.window.locator("#add-version_help");
    this.installCodeError = this.window.locator("#installationCode_help");
    this.execCodeError = this.window.locator("#execCode_help");
    this.tryToolButton = this.window.locator(".ant-btn-primary").first();
  }

  async verifyToolsAreListed() {
    await this.window.waitForTimeout(3000);
    const rowCount = await this.toolListRow.count();
    expect(rowCount).toBeGreaterThan(0);
  }

  async createNewTool() {
    await this.newToolName.fill("QATestTool");
    await this.executionTypeDropbox.click();
    await this.toolExecutionConsole.click();
    await this.versionInput.fill("1.33.7");
    await this.installCode.fill("Install test code");
    await this.saveButton.click();
    await expect(this.successNotification).toBeVisible();
    await this.window.waitForTimeout(2000);
  }

  async verifyToolIsCreated() {
   await this.searchTool('QATestTool');
    const rowCount = await this.toolListRow.count();
    expect(rowCount).toBeGreaterThan(0);
  }

  async addToolVersion() {
    await this.addVersion.click();
    await this.window.waitForTimeout(2000);

    await this.versionInput.fill("2.0.0");
    await this.saveButton.click();
  }

  async navigateToTool(toolName) {
    await this.window.waitForTimeout(3000);

    await this.listSearchBox.fill(toolName);
    await this.window.waitForTimeout(1000);
    await this.seeToolButton.click();
  }

  async verifyNewToolVersion() {
    await this.window.waitForTimeout(3000);

    const rowCount = await this.versionRow.count();
    expect(rowCount).toBeGreaterThan(1);
  }

  async searchTool(toolName) {
    await this.window.waitForTimeout(3000);

    await this.listSearchBox.fill(toolName);
    await this.window.waitForTimeout(1000);
  }

  async verifyToolCreationErrorMessages() {
    await this.saveButton.click();

    await this.window.waitForTimeout(1000);

    await expect(this.toolNameError).toBeVisible();
    await expect(this.execTypeError).toBeVisible();
    await expect(this.versionError).toBeVisible();
    await expect(this.installCodeError).toBeVisible();
    await expect(this.execCodeError).toBeVisible();
  }

  async tryTool() {
    await this.tryToolButton.click();
    await this.window.waitForTimeout(5000);
    const logSuccess = this.window.locator(
      'li:has-text("[LOG] La herramienta dockerizada ✅ [Oficial] Node se está ejecutando. de manera exitosa")'
    );
    await expect(logSuccess).toBeVisible();
    const logClose = this.window.locator(
      'li:has-text("[LOG] La herramienta dockerizada ✅ [Oficial] Node se ha cerrado")'
    );
    await expect(logClose).toBeVisible();
  }
}

module.exports = { ToolsPage };
