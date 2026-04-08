import { test, expect } from '@playwright/test';
import { openLocalSite, login, expectHomeVisible } from './helpers.js';
import { users } from './test-data.js';

test('正常ログインできる', async ({ page }) => {
  await login(page);
  await expectHomeVisible(page);
});

test('メール未入力でエラー表示', async ({ page }) => {
  await openLocalSite(page);
  await page.locator('#loginPass').fill(users.validUser.password);
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page.locator('#loginEmailErr')).toContainText('メールアドレスを入力してください');
});

test('パスワード未入力でエラー表示', async ({ page }) => {
  await openLocalSite(page);
  await page.locator('#loginEmail').fill(users.validUser.email);
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page.locator('#loginPassErr')).toContainText('パスワードを入力してください');
});