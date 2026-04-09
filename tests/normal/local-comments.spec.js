import { test, expect } from '@playwright/test';
import { login } from './helpers.js';
import { commentText } from './test-data.js';

test('コメント画面に遷移できる', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'コメント' }).first().click();
  await expect(page.locator('#comments')).toHaveClass(/active/);
});

test('コメント投稿できる', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'コメント' }).first().click();
  await page.locator('#commentInput').fill(commentText);
  await page.getByRole('button', { name: 'コメントする' }).click();
  await expect(page.locator('#commentMsg')).toContainText('コメントしました');
  await expect(page.locator('#commentList')).toContainText(commentText);
});