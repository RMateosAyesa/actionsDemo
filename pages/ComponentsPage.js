const { expect } = require("@playwright/test");

class ComponentsPage {
  constructor(window) {
    this.window = window;
    this.initializeLocators();
  }

  initializeLocators() {
    this.componentTableRow = this.window.locator('.ant-table-row');
    this.newComponentButton = this.window.locator('.anticon-plus');
    this.newComponentName = this.window.locator('#componentName');
    this.newComponentVersion = this.window.locator('#componentVersion');
    this.newComponentServiceName = this.window.locator('#serviceName');
    this.newComponentImageName = this.window.locator('#imageName');
    this.newComponentContainerName = this.window.locator('#containerName');
    this.newComponentSaveButton = this.window.locator('.ant-btn-primary');
    this.successMessage = this.window.locator('.ant-notification-topRight');
    this.compoListSearchBox = this.window.locator('[type="search"]').last();
    this.deleteComponentButton = this.window.locator('div.ant-space-item > span.ant-typography').last();
    this.confirmDelete = this.window.locator('div.ant-popover-buttons > button.ant-btn-primary');
    this.emptyList = this.window.locator('.ant-table-placeholder');
    this.viewComponentButton = this.window.locator('a', { hasText: 'Ver Componente' }).last();
    this.addComponentVersion = this.window.locator('footer > button.ant-btn-default');
    this.saveComponentVersion = this.window.locator('footer > button[type=submit]');
    this.versionRow = this.window.locator('.ant-table-row-level-0');
    this.componentNameError = this.window.locator('#componentName_help');
    this.componentVersionError = this.window.locator('#componentVersion_help');
    this.componentServiceError = this.window.locator('#serviceName_help');
    this.componentImageError = this.window.locator('#imageName_help');
    this.componentContainerError = this.window.locator('#containerName_help');
  }

  async verifyComponentsAreListed() {
    await this.window.waitForTimeout(3000);
    const rowCount = await this.componentTableRow.count();
    expect(rowCount).toBeGreaterThan(0);
  }

  async createNewComponent() {
    await this.newComponentName.fill('QATestCompo');
    await this.newComponentVersion.fill('1.37.7');
    await this.newComponentServiceName.fill('QAService');
    await this.newComponentImageName.fill('QAImage');
    await this.newComponentContainerName.fill('QAContainer');
    await this.newComponentSaveButton.click();
    await expect(this.successMessage).toBeVisible();
  }

  async searchComponent(componentName) {
    await this.window.waitForTimeout(3000);

    await this.compoListSearchBox.fill(componentName);
    await this.window.waitForTimeout(1000);
  }

  async verifyComponentIsCreated() {
    await this.searchComponent("QATestCompo");
    const rowCount = await this.componentTableRow.count();
    expect(rowCount).toBeGreaterThan(0);
  }

  async deleteComponent(componentName) {
    await this.searchComponent(componentName);
    await this.deleteComponentButton.click();
    await this.confirmDelete.click();

    await expect(this.emptyList).toBeVisible();
  }

  async goToComponent(componentName) {
    await this.searchComponent(componentName);
    await this.viewComponentButton.click();
  }

  async verifyComponentIsShown() {
    await expect(this.newComponentName).toBeVisible();
    await expect(this.newComponentName).not.toHaveValue('');

    await expect(this.newComponentVersion).toBeVisible();
    await expect(this.newComponentVersion).not.toHaveValue('');

    await expect(this.newComponentServiceName).toBeVisible();
    await expect(this.newComponentServiceName).not.toHaveValue('');

    await expect(this.newComponentImageName).toBeVisible();
    await expect(this.newComponentImageName).not.toHaveValue('');

    await expect(this.newComponentContainerName).toBeVisible();
    await expect(this.newComponentContainerName).not.toHaveValue('');
  }

  async addNewComponentVersion() {
    await this.addComponentVersion.click();
    await this.window.waitForTimeout(1000);

    await this.newComponentVersion.fill('2.0.0');
    await this.newComponentServiceName.fill('Service2.0');
    await this.newComponentImageName.fill('Image2.0');
    await this.newComponentContainerName.fill('Container2.0'); 

    await this.saveComponentVersion.click();
  }

  async verifyNewComponentVersion() {
    await this.window.waitForTimeout(3000);

    const rowCount = await this.versionRow.count();
    expect(rowCount).toBeGreaterThan(1);
  }

  async verifyErrorMessages() {
    await this.newComponentSaveButton.click();
    await this.window.waitForTimeout(1000);

    await expect(this.componentNameError).toBeVisible();
    await expect(this.componentVersionError).toBeVisible();
    await expect(this.componentServiceError).toBeVisible();
    await expect(this.componentImageError).toBeVisible();
    await expect(this.componentContainerError).toBeVisible();
  }
}

module.exports = { ComponentsPage };
