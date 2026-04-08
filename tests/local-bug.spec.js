import { test, expect } from '@playwright/test';
import { login } from './helpers';

test('いいね数が増えないバグ確認', async ({ page }) => {
  await login(page);

  const likeBtn = page.getByRole('button', { name: /いいね/ }).first();
  const before = await likeBtn.textContent();

  await likeBtn.click();

  await expect(likeBtn).toHaveText(before || '');
});

test('空コメント送信できてしまうバグ', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: 'コメント' }).first().click();
  await page.getByRole('button', { name: 'コメントする' }).click();

  await expect(page.locator('#commentMsg')).toContainText('コメントしました');
});

test('hanako検索できないバグ', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: '検索' }).click();
  await page.locator('#searchInput').fill('hanako');

  await expect(page.locator('#searchResults')).toContainText('検索結果はありません');
});