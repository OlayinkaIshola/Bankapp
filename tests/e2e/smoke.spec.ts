import { test, expect } from '@playwright/test';

test('home → login → 2FA → dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByLabel(/Email/i).fill('demo@bank.com');
  await page.getByLabel(/Password/i).fill('demo123');
  await page.getByRole('button', { name: /Sign in/i }).click();
  await page.getByText(/Two-Factor Authentication/i);
  await page.getByLabel(/code/i).fill('123456');
  await page.getByRole('button', { name: /Verify/i }).click();
  await expect(page.getByText(/Dashboard|Welcome back/i)).toBeVisible();
});
