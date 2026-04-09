import path from 'path';
import { fileURLToPath } from 'url';
import { expect } from '@playwright/test';
import { users } from './test-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const filePath = 'file://' + path.resolve(__dirname, '../index.html');

export async function openLocalSite(page) {
  await page.goto(filePath);
  await expect(page.locator('#login')).toBeVisible();
}

export async function login(
  page,
  email = users.validUser.email,
  password = users.validUser.password
) {
  await openLocalSite(page);
  await page.locator('#loginEmail').fill(email);
  await page.locator('#loginPass').fill(password);
  await page.getByRole('button', { name: 'ログイン' }).click();
}

export async function expectHomeVisible(page) {
  await expect(page.locator('#home')).toBeVisible();
  await expect(page.locator('#home')).toHaveClass(/active/);
}