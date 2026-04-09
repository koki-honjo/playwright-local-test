import { test, expect } from '@playwright/test';
import { login, gotoTab } from './helpers.js';

test('お知らせ一覧へ遷移できる', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'お知らせ' }).click();
  await expect(page.locator('#announcements')).toHaveClass(/active/);
});

test('お知らせ一覧が表示される', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'お知らせ' }).click();
  await expect(page.locator('#announcementList')).toContainText('研修実施のお知らせ');
});

test('下部タブでホームへ遷移できる', async ({ page }) => {
  await login(page);
  await gotoTab(page, '投稿');
  await gotoTab(page, 'ホーム');
  await expect(page.locator('#home')).toHaveClass(/active/);
});

test('下部タブで検索へ遷移できる', async ({ page }) => {
  await login(page);
  await gotoTab(page, '検索');
  await expect(page.locator('#search')).toHaveClass(/active/);
});

test('ログアウトできる', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'ログアウト' }).click();
  await expect(page.locator('#login')).toHaveClass(/active/);
});