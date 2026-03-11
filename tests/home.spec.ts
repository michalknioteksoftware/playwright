import { test, expect } from '@playwright/test';

test('home page shows Welcome header', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Welcome', level: 1 })
  ).toBeVisible();
});

test('login as admin', async ({ page }) => {
  await page.goto('/');

  const alert = page
    .locator('div.alert[role="alert"]')
    .filter({ hasText: /sample credentials/i })
    .first();

  const alertText = (await alert.innerText()).split('\n').map(line => line.trim());
  const adminLine = alertText.find(
    line => line.includes('admin@example.com') && line.includes('/')
  );

  if (!adminLine) {
    throw new Error('Admin credentials line not found in sample credentials alert.');
  }

  const [email, password] = adminLine.split('/').map(part => part.trim());

  await page.getByRole('textbox', { name: 'E-mail' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.waitForLoadState('load');
  await expect(page.getByText('Name: Admin', { exact: true })).toBeVisible();
  await expect(page.getByText('Admin: you have administrator')).toBeVisible();
});

