import { test, expect } from '@playwright/test';

//todo: a fixture that is a get cell by number

test('Verify that valid moves (empty cells) are accepted', async ({ page }) => {
  await page.goto('https://tic-tac-toe-tau-lyart-50.vercel.app/');
  const cellOne = page.getByRole('button', { name: 'Cell 1' });

  // Click the 1st cell in the grid.
  await cellOne.click();
  await page.getByRole('button', { name: 'Cell 2' }).click();
  await page.getByRole('button', { name: 'Cell 3' }).click();
  //await page.getByRole('image', { name: 'X' })

  // Expect a image called "X"
  await expect(cellOne.getByAltText('X')).toBeVisible();
});

test('Verify that invalid moves (filled cells) are not accepted', async ({
  page,
}) => {
  await page.goto('https://tic-tac-toe-tau-lyart-50.vercel.app/');
  const cellOne = page.getByRole('button', { name: 'Cell 1' });

  // Click the 1st cell in the grid.
  await cellOne.click();

  // Expect cell 1 to be disabled
  await expect(cellOne).toBeDisabled();
});
