const path = require('path');
const { expect } = require('@playwright/test');
const { users } = require('./test-data.js');

const filePath = 'file://' + path.resolve(__dirname, '../index.html');

async function openLocalSite(page) {
  await page.goto(filePath);
  await expect(page.locator('#login')).toBeVisible();
}

async function login(
  page,
  email = users.validUser.email,
  password = users.validUser.password
) {
  await openLocalSite(page);

  await expect(page.locator('#loginEmail')).toBeVisible();
  await page.locator('#loginEmail').fill(email);

  await expect(page.locator('#loginPass')).toBeVisible();
  await page.locator('#loginPass').fill(password);

  await page.getByRole('button', { name: 'ログイン' }).click();
}

async function expectHomeVisible(page) {
  await expect(page.locator('#home')).toBeVisible();
  await expect(page.locator('#home')).toHaveClass(/active/);
}

async function gotoTab(page, name) {
  const tabbar = page.locator('#tabbar');
  await expect(tabbar).toBeVisible();
  await tabbar.getByRole('button', { name, exact: true }).click();
}

async function expectVisibleText(page, text) {
  await expect(page.getByText(text)).toBeVisible();
}

module.exports = {
  filePath,
  openLocalSite,
  login,
  expectHomeVisible,
  gotoTab,
  expectVisibleText,
};