import { test, expect } from '@playwright/test';
import { login, gotoTab } from './helpers.js';
import { searchWords } from './test-data.js';

test('検索画面に遷移できる', async ({ page }) => {
  await login(page);
  await gotoTab(page, '検索');
  await expect(page.locator('#search')).toHaveClass(/active/);
});

test('mikaで検索できる', async ({ page }) => {
  await login(page);
  await gotoTab(page, '検索');
  await page.locator('#searchInput').fill(searchWords.hit);
  await expect(page.locator('#searchResults')).toContainText('mika');
});

test('検索結果なし文言が表示される', async ({ page }) => {
  await login(page);
  await gotoTab(page, '検索');
  await page.locator('#searchInput').fill('zzzzzz');
  await expect(page.locator('#searchResults')).toContainText('検索結果はありません');
});