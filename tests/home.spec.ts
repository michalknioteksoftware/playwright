import { test, expect } from '@playwright/test';

test('home page shows Welcome header', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Welcome', level: 1 })
  ).toBeVisible();
});

