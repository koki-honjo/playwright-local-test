const { test, expect } = require('@playwright/test');
const { login } = require('./helpers.js');

test.skip('いいね押下でいいね数が増える', async ({ page }) => {
  await login(page);
});

test.skip('空コメントは送信できない', async ({ page }) => {
  await login(page);
});

test.skip('hanakoで検索するとユーザーが表示される', async ({ page }) => {
  await login(page);
});