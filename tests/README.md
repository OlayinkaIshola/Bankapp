# Testing Scaffolding (optional)

This repo does not include test deps by default. To enable E2E tests with Playwright and unit tests:

1. Install dependencies (ask/confirm before running):
   npm install -D @playwright/test @testing-library/react @testing-library/jest-dom jest ts-jest @types/jest

2. Initialize Playwright (downloads browsers):
   npx playwright install

3. Add scripts to package.json:
   "test:e2e": "playwright test",
   "test:unit": "jest",
   "test": "npm run test:unit && npm run test:e2e"

4. Example Playwright smoke test (save as tests/e2e/smoke.spec.ts):

import { test, expect } from '@playwright/test';

test('home → login → 2FA → dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByLabel('Email address').fill('demo@bank.com');
  await page.getByLabel('Password').fill('demo123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByText('Two-Factor Authentication');
  await page.getByLabel('6-digit code').fill('123456');
  await page.getByRole('button', { name: 'Verify' }).click();
  await expect(page.getByText('Welcome back')).toBeVisible();
});

5. Example unit test setup (jest.config.js, tests/unit/*) – I can generate on request.
