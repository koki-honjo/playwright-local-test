import { test, expect } from '@playwright/test';
import path from 'path';

const filePath = 'file://' + path.resolve('./index.html');

async function login(page) {
  await page.goto(filePath);
  await page.locator('#loginEmail').fill('tester@example.com');
  await page.locator('#loginPass').fill('test1234');
  await page.getByRole('button', { name: 'ログイン' }).click();
}

test('正常ログインできる', async ({ page }) => {
  await login(page);
  await expect(page.locator('#home')).toHaveClass(/active/);
});

test('メール未入力でエラー表示', async ({ page }) => {
  await page.goto(filePath);
  await page.locator('#loginPass').fill('test1234');
  await page.getByRole('button', { name: 'ログイン' }).click();

  await expect(page.locator('#loginEmailErr')).toContainText('メールアドレスを入力してください');
});

test('パスワード未入力でエラー表示', async ({ page }) => {
  await page.goto(filePath);
  await page.locator('#loginEmail').fill('tester@example.com');
  await page.getByRole('button', { name: 'ログイン' }).click();

  await expect(page.locator('#loginPassErr')).toContainText('パスワードを入力してください');
});

test('投稿できる', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: '投稿' }).click();
  await page.locator('#postText').fill('細かい投稿テスト');
  await page.getByRole('button', { name: '投稿する' }).click();

  await expect(page.locator('#feed')).toContainText('細かい投稿テスト');
});

test('空投稿でエラー表示', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: '投稿' }).click();
  await page.getByRole('button', { name: '投稿する' }).click();

  await expect(page.locator('#postErr')).toContainText('本文を入力してください');
});
// =========================
// 🔥 バグ検証テスト
// =========================

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