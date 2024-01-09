/* eslint-disable no-await-in-loop */
import { Then, When } from '../../node_modules/@cucumber/cucumber';

When('I click remove button for {string} document', function(title) {
  this.ui.drawer.clipboard.waitForVisible();
  this.ui.drawer.clipboard.removeItem(title);
});

When('I click the clipboard move action', async function() {
  const isClipboarVisible = await this.ui.drawer.clipboard.isVisible();
  if (!isClipboarVisible) {
    const draw = this.ui.drawer;
    await draw.open('clipboard');
  }
  await this.ui.waitForToastNotVisible();
  await this.ui.drawer.clipboard.move();
});

When('I click the clipboard paste action', async function() {
  const drawerVisible = await this.ui.drawer.clipboard.isVisible();
  if (!drawerVisible) {
    await this.ui.drawer.open('clipboard');
  }
  await this.ui.waitForToastNotVisible();
  await this.ui.drawer.clipboard.paste();
});

Then('I can see the clipboard has {string} document', async function(title) {
  await this.ui.drawer.clipboard.waitForVisible();
  let found = false;
  await driver.waitUntil(
    async () => {
      const clipboardItems = await this.ui.drawer.clipboard.el.$$('#list .list-item-title');
      for (let index = 0; index < clipboardItems.length; index++) {
        const elementText = await clipboardItems[index].getText();
        if (elementText === title) found = true;
      }
      return found;
    },
    {
      timeout: 3000,
      timeoutMsg: 'step  definition clipborad 37',
    },
  );
});
Then('I can see the clipboard has {int} item(s)', async function(nb) {
  const drawer = await this.ui.drawer;
  const clipboard = await drawer.clipboard;
  await clipboard.waitForVisible();
  const nbItems = await clipboard.nbItems;
  if (nbItems !== nb) {
    throw Error(`Expected clipboard count to be ${nb} but found ${nbItems}`);
  }
});
Then('I can see clipboard actions disabled', async function() {
  const drawer = await this.ui.drawer;
  const clipboard = await drawer.clipboard;
  const isClipboardVisible = await clipboard.isVisible();
  if (!isClipboardVisible) {
    await drawer.open('clipboard');
  }
  const moveButton = await clipboard.moveButton;
  await moveButton.waitForVisible();
  await driver.waitUntil(async () => (await moveButton.getAttribute('disabled')) !== null, {
    timeoutMsg: 'step  definition clipborad 65',
  });
  const pasteButton = await clipboard.pasteButton;
  await pasteButton.waitForVisible();
  await driver.waitUntil(async () => (await pasteButton.getAttribute('disabled')) !== null, {
    timeoutMsg: 'step  definition clipborad 70',
  });
});
