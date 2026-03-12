import { test, expect } from '@playwright/test';

/**
 * Demo: Playwright features you can use in your tests
 * Run: npx playwright test tests/playwright-features-demo.spec.ts
 */

test.describe('Playwright features demo', () => {
  test('different ways to find elements (locators)', async ({ page }) => {
    await page.goto('/');

    // By role (best for accessibility)
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();

    // By text (full or partial)
    await expect(page.getByText('Welcome')).toBeVisible();
    await expect(page.getByText(/welcome/i)).toBeVisible();

    // By label (for form fields)
    // page.getByLabel('E-mail')

    // By placeholder
    // page.getByPlaceholder('your@email.com')

    // By test id (add data-testid in your app when needed)
    // page.getByTestId('main-header')
  });

  test('assertions: visibility, count, text', async ({ page }) => {
    await page.goto('/');

    // Element is visible
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();

    // Element has exact text
    await expect(page.getByRole('heading', { name: 'Welcome' })).toHaveText('Welcome');

    // Count elements (e.g. exactly 1 heading with "Welcome")
    await expect(page.getByRole('heading', { name: 'Welcome' })).toHaveCount(1);
  });

  test('keyboard and form actions', async ({ page }) => {
    await page.goto('/');

    // Parse credentials from the page (same as home.spec.ts) so the test works in any environment
    const alert = page
      .locator('div.alert[role="alert"]')
      .filter({ hasText: /sample credentials/i })
      .first();
    const alertText = (await alert.innerText()).split('\n').map((line) => line.trim());
    const adminLine = alertText.find(
      (line) => line.includes('admin@example.com') && line.includes('/')
    );
    if (!adminLine) throw new Error('Admin credentials line not found in sample credentials alert.');
    const [email, password] = adminLine.split('/').map((part) => part.trim());

    // Fill, Tab to next field, then submit with Enter
    const emailInput = page.getByRole('textbox', { name: 'E-mail' });
    await emailInput.fill(email);
    await emailInput.press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
    //await page.waitForLoadState('load');
    await expect(page.getByText('Name: Admin', { exact: true })).toBeVisible();
  });

  test('wait for load state (optional)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');
    await page.waitForLoadState('networkidle'); // optional: wait until no network for 500ms
  });
});

test.describe('Advanced: network interception (commented - uncomment to try)', () => {
  test('mock API response', async ({ page }) => {
    // Mock an API before navigating
    await page.route('**/api/user', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ name: 'Mock User', role: 'admin' }),
      });
    });

    await page.goto('/');
    // Your app would now get the mocked response for /api/user
  });
});
