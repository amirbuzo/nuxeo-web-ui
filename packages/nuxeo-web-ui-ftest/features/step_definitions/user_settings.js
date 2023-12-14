import { Given, Then, When } from '../../node_modules/@cucumber/cucumber';

/* Cloud Services */

Given(/^the following OAuth2 providers exist$/, (table) =>
  Promise.all(table.rows().map((row) => fixtures.oauth2Providers.create(row[0]))),
);

Given(/^I have tokens for the following OAuth2 providers$/, function(table) {
  return Promise.all(table.rows().map((row) => fixtures.oauth2Providers.createToken(row[0], this.username)));
});

When(/^I am on user cloud services page$/, function() {
  return this.ui.goToUserCloudServices();
});

Then(/^I can only see (\d+) provider token[s]? that belong[s]? to me$/, function(numberOfTokens) {
  this.ui.userCloudServices.waitForVisible();
  driver.waitUntil(() => this.ui.userCloudServices.getTokens(this.username).length === numberOfTokens);
});

Then(/^I can delete token for provider "(.+)" that belongs to me$/, function(provider) {
  this.ui.userCloudServices.waitForVisible();
  let tokens;
  driver.waitUntil(() => {
    tokens = this.ui.userCloudServices.getTokens(this.username, provider);
    return tokens.length === 1;
  });
  const deleteButton = tokens[0].deleteButton();
  deleteButton.waitForVisible();
  deleteButton.click();
  driver.alertAccept();
  this.ui.userCloudServices.waitForVisible();
  driver.waitUntil(() => this.ui.userCloudServices.getTokens(this.username, provider).length === 0);
});

/* Authorized Applications */

Given(/^the following OAuth2 clients exist$/, (table) =>
  Promise.all(table.rows().map((row) => fixtures.oauth2Clients.create(row[0]))),
);

Given(/^I have tokens for the following OAuth2 clients$/, function(table) {
  return Promise.all(table.rows().map((row) => fixtures.oauth2Clients.createToken(row[0], this.username)));
});

When(/^I am on user authorized applications page$/, async function() {
  await this.ui.goToUserAuthorizedApps();
});

Then(/^I can see "(.+)" as an authorized application$/, function(application) {
  this.ui.userAuthorizedApps.waitForVisible();
  let tokens;
  driver.waitUntil(() => {
    tokens = this.ui.userAuthorizedApps.getApps(application);
    return tokens.length === 1;
  });
});

Then(/^I can only see (\d+) authorized application[s]?$/, async function(numberOfApps) {
  const authPage = await this.ui.userAuthorizedApps;
  await authPage.waitForVisible();
  const apps = await this.ui.userAuthorizedApps.getApps();
  driver.waitUntil(() => apps.length === numberOfApps);
});

Then('I cannot see authorized application', function() {
  this.ui.emptyAuthorizedApps.waitForDisplayed();
});

Then(/^I can revoke access for "(.+)" application$/, async function(appName) {
  const authPage = await this.ui.userAuthorizedApps;
  await authPage.waitForVisible();
  const apps = await this.ui.userAuthorizedApps.getApps();
  await browser.waitUntil(() => apps.length > 0);
  const appRevoke = await this.ui.userAuthorizedApps.getApps(appName);
  appRevoke.length.should.equal(1);
  const revokeButton = await apps[0].revokeButton();
  revokeButton.waitForVisible();
  revokeButton.click();
  driver.alertAccept();
  this.ui.userAuthorizedApps.waitForVisible();
  driver.waitUntil(() => this.ui.userAuthorizedApps.getApps(appName).length === 0);
});
