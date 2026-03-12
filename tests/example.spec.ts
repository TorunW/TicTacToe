import { test, expect } from '@playwright/test';

test.describe('Equivalence partitioning', () => {
  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test(
    'Verify that valid moves (empty cells) are accepted and invalid moves (occupied cells) are rejected using equivalence partitions.',
    {
      annotation: [{ type: 'ticket-id', description: 'TC00-1' }],
    },
    async ({ page }) => {
      await page.goto('https://playwright.dev/');

      // Click the get started link.
      await page.getByRole('link', { name: 'Get started' }).click();

      const installationHeading = page.getByRole('heading', {
        name: 'Installation',
      });

      // Expects page to have a heading with the name of Installation.
      await expect(installationHeading).toBeVisible();
    },
  );

  test('visits torun website', async ({ page }) => {
    await page.goto('https://www.google.com');
    await page.getByRole('button', { name: 'Alle akzeptieren' }).click();
    await page.getByRole('combobox', { name: 'Suche' }).fill('Torun Wikström');
    await page
      .getByRole('button', { name: 'Google Suche', exact: true })
      .first()
      .click();

    await page.getByText('Torun Wikström');
  });
});
