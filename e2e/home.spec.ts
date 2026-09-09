import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/analytics/**', (route) => route.fulfill({ status: 204 }));
});

test('renders the current portfolio identity', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { level: 1 })).toContainText('PRATHAM');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('JAIN');
});