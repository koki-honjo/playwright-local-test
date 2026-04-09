import { test, expect } from '@playwright/test';
import { openLocalSite } from './helpers.js';
import { registerData } from './test-data.js';

test('新規登録画面の必須項目未入力でエラー', async ({ page }) => {
  await openLocalSite(page);
  await page.getByRole('button', { name: '新規登録' }).click();
  await page.getByRole('button', { name: '登録する' }).click();
  await expect(page.locator('#registerErr')).toContainText('必須項目を入力してください');
});

test('新規登録完了メッセージ表示', async ({ page }) => {
  await openLocalSite(page);
  await page.getByRole('button', { name: '新規登録' }).click();
  await page.locator('#regName').fill(registerData.name);
  await page.locator('#regEmail').fill(registerData.email);
  await page.locator('#regPass').fill(registerData.password);
  await page.getByRole('button', { name: '登録する' }).click();
  await expect(page.locator('#registerMsg')).toContainText('登録が完了しました');
});

test('ログインへ戻るボタンで戻れる', async ({ page }) => {
  await openLocalSite(page);
  await page.getByRole('button', { name: '新規登録' }).click();
  await page.getByRole('button', { name: 'ログインへ戻る' }).click();
  await expect(page.locator('#login')).toHaveClass(/active/);
});

test('パスワード再設定メール送信メッセージ表示', async ({ page }) => {
  await openLocalSite(page);
  await page.getByRole('button', { name: 'パスワードを忘れた場合' }).click();
  await page.locator('#resetEmail').fill('tester@example.com');
  await page.getByRole('button', { name: '再設定メール送信' }).click();
  await expect(page.locator('#resetMsg')).toContainText('再設定メールを送信しました');
});