import { Then } from '../../node_modules/@cucumber/cucumber';

Then('I click the bulk edit button with {string} layout', function(layoutName) {
  this.ui.browser.selectionToolbar.clickResultsActionMenu(`nuxeo-edit-documents-button[layout=${layoutName}]`);
});

Then('I can bulk edit multiple properties in {string} layout:', function(layoutName, table) {
  const action = this.ui.bulkEdit(`nuxeo-edit-documents-button[layout="${layoutName}"]`);
  action.dialog.waitForDisplayed();
  action.editMultipleOptions(table);
  action.saveButton.click();
});

Then('I see a toast notification with the following message {string}', async function(message) {
  const notificationMessage = await this.ui.getToastMessage(message);
  const trimmedMessage = await message.trim().replace(/"/g, '');
  await notificationMessage.should.be.equals(trimmedMessage);
});

Then('I click the toast notification dismiss button', function() {
  this.ui.getToastDismissButton().click();
  this.ui.waitForToastNotVisible();
});
