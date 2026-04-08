import { test, expect } from '@playwright/test';
import { login, expectHomeVisible } from './helpers.js';
import { searchWords } from './test-data.js';

test('mikaを検索できる', async ({ page }) => {
  await login(page);
  await expectHomeVisible(page);

  await page.getByRole('button', { name: '検索' }).click();
  await page.locator('#searchInput').fill(searchWords.hit);

  await expect(page.locator('#searchResults')).toContainText('mika');
});

test('hanako検索できないバグ確認', async ({ page }) => {
  await login(page);
  await expectHomeVisible(page);

  await page.getByRole('button', { name: '検索' }).click();
  await page.locator('#searchInput').fill(searchWords.noHit);

  await expect(page.locator('#searchResults')).toContainText('検索結果はありません');
});