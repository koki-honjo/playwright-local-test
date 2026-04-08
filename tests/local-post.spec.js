import { test, expect } from '@playwright/test';
import { login, gotoTab } from './helpers.js';
import { posts } from './test-data.js';

test('投稿画面に遷移できる', async ({ page }) => {
  await login(page);
  await gotoTab(page, '投稿');
  await expect(page.locator('#post')).toHaveClass(/active/);
});

test('本文未入力でエラー表示', async ({ page }) => {
  await login(page);
  await gotoTab(page, '投稿');
  await page.getByRole('button', { name: '投稿する' }).click();
  await expect(page.locator('#postErr')).toContainText('本文を入力してください');
});

test('正常に投稿できる', async ({ page }) => {
  await login(page);
  await gotoTab(page, '投稿');
  await page.locator('#postText').fill(posts.normal);
  await page.getByRole('button', { name: '投稿する' }).click();
  await expect(page.locator('#home')).toHaveClass(/active/);
  await expect(page.locator('#feed')).toContainText(posts.normal);
});

test('投稿後に入力欄がクリアされる', async ({ page }) => {
  await login(page);
  await gotoTab(page, '投稿');
  await page.locator('#postText').fill(posts.normal);
  await page.getByRole('button', { name: '投稿する' }).click();
  await gotoTab(page, '投稿');
  await expect(page.locator('#postText')).toHaveValue('');
});