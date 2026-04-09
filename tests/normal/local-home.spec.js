import { test, expect } from '@playwright/test';
import { login, expectHomeVisible } from './helpers.js';

test('ホーム画面に投稿一覧が表示される', async ({ page }) => {
  await login(page);
  await expectHomeVisible(page);
  await expect(page.locator('#feed')).toContainText('美香');
  await expect(page.locator('#feed')).toContainText('ゆうと');
  await expect(page.locator('#feed')).toContainText('QAリード');
});

test('投稿数表示が見える', async ({ page }) => {
  await login(page);
  await expect(page.locator('#postCount')).toBeVisible();
});

test('詳細ボタンで投稿詳細へ遷移', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: '詳細' }).first().click();
  await expect(page.locator('#detail')).toHaveClass(/active/);
});

test('コメントボタンでコメント画面へ遷移', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'コメント' }).first().click();
  await expect(page.locator('#comments')).toHaveClass(/active/);
});

test('プロフィールボタンでプロフィール画面へ遷移', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'プロフィール' }).first().click();
  await expect(page.locator('#profile')).toHaveClass(/active/);
});

test('ホームからDM一覧へ遷移できる', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'DM一覧' }).click();
  await expect(page.locator('#dmList')).toHaveClass(/active/);
});