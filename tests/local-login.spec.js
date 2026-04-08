import { test, expect } from '@playwright/test';
import { openLocalSite, login } from './helpers';

test('正常ログインできる', async ({ page }) => {
  await login(page);
});

test('メール未入力でエラー表示', async ({ page }) => {
  await openLocalSite(page);
  await page.locator('#loginPass').fill('test1234');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page.locator('#loginEmailErr')).toContainText('メールアドレスを入力してください');
});

test('パスワード未入力でエラー表示', async ({ page }) => {
  await openLocalSite(page);
  await page.locator('#loginEmail').fill('tester@example.com');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page.locator('#loginPassErr')).toContainText('パスワードを入力してください');
});