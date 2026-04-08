import { test, expect } from '@playwright/test';
import { login, gotoTab } from './helpers.js';

test('通知一覧画面に遷移できる', async ({ page }) => {
  await login(page);
  await gotoTab(page, '通知');
  await expect(page.locator('#notify')).toHaveClass(/active/);
});

test('通知一覧が表示される', async ({ page }) => {
  await login(page);
  await gotoTab(page, '通知');
  await expect(page.locator('#notifications')).toContainText('美香さんがあなたをフォローしました');
});

test('通知詳細へ遷移できる', async ({ page }) => {
  await login(page);
  await gotoTab(page, '通知');
  await page.getByRole('button', { name: '詳細' }).first().click();
  await expect(page.locator('#notifyDetail')).toHaveClass(/active/);
});

test('通知へ戻るボタンで戻れる', async ({ page }) => {
  await login(page);
  await gotoTab(page, '通知');
  await page.getByRole('button', { name: '詳細' }).first().click();
  await page.getByRole('button', { name: '通知へ戻る' }).click();
  await expect(page.locator('#notify')).toHaveClass(/active/);
});