const { test, expect } = require('@playwright/test');
const { openLocalSite, login, expectHomeVisible } = require('./helpers.js');
const { users } = require('./test-data.js');

test('ログイン画面が表示される', async ({ page }) => {
  await openLocalSite(page);
  await expect(page.locator('#login')).toBeVisible();
  await expect(page.locator('#login')).toHaveClass(/active/);
  await expect(page.locator('#loginEmail')).toBeVisible();
  await expect(page.locator('#loginPass')).toBeVisible();
});

test('入力例を入れるで値が入る', async ({ page }) => {
  await openLocalSite(page);
  await page.getByRole('button', { name: '入力例を入れる' }).click();
  await expect(page.locator('#loginEmail')).toHaveValue(users.validUser.email);
  await expect(page.locator('#loginPass')).toHaveValue(users.validUser.password);
});

test('メール未入力でエラー表示', async ({ page }) => {
  await openLocalSite(page);
  await page.locator('#loginPass').fill(users.validUser.password);
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page.locator('#loginEmailErr')).toContainText('メールアドレスを入力してください');
});

test('パスワード未入力でエラー表示', async ({ page }) => {
  await openLocalSite(page);
  await page.locator('#loginEmail').fill(users.validUser.email);
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page.locator('#loginPassErr')).toContainText('パスワードを入力してください');
});

test('正常ログインできる', async ({ page }) => {
  await login(page);
  await expectHomeVisible(page);
  await expect(page.locator('#tabbar')).not.toHaveClass(/hidden/);
});

test('認証情報が違うとアラート表示', async ({ page }) => {
  await openLocalSite(page);

  const dialogPromise = page.waitForEvent('dialog');
  await page.locator('#loginEmail').fill(users.invalidUser.email);
  await page.locator('#loginPass').fill(users.invalidUser.password);
  await page.getByRole('button', { name: 'ログイン' }).click();

  const dialog = await dialogPromise;
  await expect(dialog.message()).toContain('ログインに失敗しました');
  await dialog.accept();
});

test('新規登録画面へ遷移できる', async ({ page }) => {
  await openLocalSite(page);
  await page.getByRole('button', { name: '新規登録' }).click();
  await expect(page.locator('#register')).toHaveClass(/active/);
});

test('パスワード再設定画面へ遷移できる', async ({ page }) => {
  await openLocalSite(page);
  await page.getByRole('button', { name: 'パスワードを忘れた場合' }).click();
  await expect(page.locator('#reset')).toHaveClass(/active/);
});