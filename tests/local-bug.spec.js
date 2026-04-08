import { test, expect } from '@playwright/test';
import { login } from './helpers.js';

test('いいね押下でいいね数が増える', async ({ page }) => {
  await login(page);

  const likeBtn = page.getByRole('button', { name: /いいね/ }).first();
  const beforeText = await likeBtn.textContent();

  const beforeMatch = beforeText?.match(/いいね\s*(\d+)/);
  const beforeCount = beforeMatch ? Number(beforeMatch[1]) : 0;

  await likeBtn.click();

  const expectedCount = beforeCount + 1;
  await expect(likeBtn).toContainText(`いいね ${expectedCount}`);
});

test('空コメントは送信できない', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: 'コメント' }).first().click();
  await page.getByRole('button', { name: 'コメントする' }).click();

  await expect(page.locator('#commentMsg')).not.toContainText('コメントしました');
});

test('hanakoで検索するとユーザーが表示される', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: '検索' }).click();
  await page.locator('#searchInput').fill('hanako');

  await expect(page.locator('#searchResults')).toContainText('hanako');
});