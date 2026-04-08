import path from 'path';
import { expect } from '@playwright/test';

export const filePath = 'file://' + path.resolve('./index.html');

export async function openLocalSite(page) {
  await page.goto(filePath);
}

export async function login(page) {
  await openLocalSite(page);
  await page.locator('#loginEmail').fill('tester@example.com');
  await page.locator('#loginPass').fill('test1234');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page.locator('#home')).toHaveClass(/active/);
}