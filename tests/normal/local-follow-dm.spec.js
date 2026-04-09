import { test, expect } from '@playwright/test';
import { login } from './helpers.js';
import { dmText } from './test-data.js';

test('フォロー一覧へ遷移できる', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'フォロー一覧' }).click();
  await expect(page.locator('#followList')).toHaveClass(/active/);
});

test('フォロー中一覧が表示される', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'フォロー一覧' }).click();
  await expect(page.locator('#followListBox')).toContainText('mika');
});

test('DM一覧へ遷移できる', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'DM一覧' }).click();
  await expect(page.locator('#dmList')).toHaveClass(/active/);
});

test('DM詳細へ遷移できる', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'DM一覧' }).click();
  await page.getByRole('button', { name: '開く' }).first().click();
  await expect(page.locator('#dmDetail')).toHaveClass(/active/);
});

test('DM送信できる', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'DM一覧' }).click();
  await page.getByRole('button', { name: '開く' }).first().click();
  await page.locator('#dmInput').fill(dmText);
  await page.getByRole('button', { name: '送信' }).click();
  await expect(page.locator('#dmMsg')).toContainText('送信しました');
  await expect(page.locator('#dmDetailBox')).toContainText(dmText);
});