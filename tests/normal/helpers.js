const path = require('path');
const { expect } = require('@playwright/test');
const { users } = require('./test-data.js');

// 👇 ここ修正
const filePath = 'file://' + path.resolve(__dirname, '../../index.html');

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

  await page.locator('#loginEmail').fill(email);
  await page.locator('#loginPass').fill(password);

  await page.getByRole('button', { name: 'ログイン' }).click();
}

async function expectHomeVisible(page) {
  await expect(page.locator('#home')).toBeVisible();
}

async function gotoTab(page, name) {
  await page.locator('#tabbar').getByRole('button', { name }).click();
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