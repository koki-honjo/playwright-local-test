import { test, expect } from '@playwright/test';
import { login, gotoTab } from './helpers.js';

test('プロフィール画面に遷移できる', async ({ page }) => {
  await login(page);
  await gotoTab(page, 'プロフィール');
  await expect(page.locator('#profile')).toHaveClass(/active/);
});

test('プロフィール保存メッセージ表示', async ({ page }) => {
  await login(page);
  await gotoTab(page, 'プロフィール');
  await page.getByRole('button', { name: '保存' }).click();
  await expect(page.locator('#profileMsg')).toContainText('保存しました');
});

test('設定画面に遷移できる', async ({ page }) => {
  await login(page);
  await gotoTab(page, 'プロフィール');
  await page.getByText('こちら').first().click();
  await expect(page.locator('#settings')).toHaveClass(/active/);
});

test('設定保存メッセージ表示', async ({ page }) => {
  await login(page);
  await gotoTab(page, 'プロフィール');
  await page.getByText('こちら').first().click();
  await page.getByRole('button', { name: '設定を保存' }).click();
  await expect(page.locator('#settingsMsg')).toContainText('設定を保存しました');
});