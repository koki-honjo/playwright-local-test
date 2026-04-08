import { test, expect } from '@playwright/test';
import { login } from './helpers';

test('投稿できる', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: '投稿' }).click();
  await page.locator('#postText').fill('分割後の投稿テスト');
  await page.getByRole('button', { name: '投稿する' }).click();

  await expect(page.locator('#feed')).toContainText('分割後の投稿テスト');
});

test('空投稿でエラー表示', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: '投稿' }).click();
  await page.getByRole('button', { name: '投稿する' }).click();

  await expect(page.locator('#postErr')).toContainText('本文を入力してください');
});