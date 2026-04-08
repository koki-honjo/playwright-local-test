import path from 'path';
import { expect } from '@playwright/test';
import { users } from './test-data.js';

export const filePath = 'file://' + path.resolve('./index.html');

export async function openLocalSite(page) {
  await page.goto(filePath);
  await expect(page.locator('#login')).toHaveClass(/active/);
}

export async function login(
  page,
  email = users.validUser.email,
  password = users.validUser.password
) {
  await openLocalSite(page);

  await expect(page.locator('#loginEmail')).toBeVisible();
  await page.locator('#loginEmail').fill(email);

  await expect(page.locator('#loginPass')).toBeVisible();
  await page.locator('#loginPass').fill(password);

  await page.getByRole('button', { name: 'ログイン' }).click();
}

export async function expectHomeVisible(page) {
  await expect(page.locator('#home')).toHaveClass(/active/);
}

export async function gotoTab(page, name) {
  await page.getByRole('button', { name }).click();
}

export async function expectVisibleText(page, text) {
  await expect(page.getByText(text)).toBeVisible();
}