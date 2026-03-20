import { expect } from '@playwright/test';
import { test } from './base-test';

test('Verify that the board is a 3x3 grid', async ({ page, board }) => {
  const { tictacBoard } = board;

  await page.goto('https://tic-tac-toe-tau-lyart-50.vercel.app/');
  //expect 3 rows in grid
  const cellRows = tictacBoard.getByRole('row');
  await expect(cellRows).toHaveCount(3);
  //expect 3 cells in each row
  const count = await cellRows.count();
  for (let i = 0; i < count; i++) {
    await expect(cellRows.nth(i).getByRole('gridcell')).toHaveCount(3);
  }
});

test('Verify that there is 9 cells and that all are enabled', async ({
  page,
  board,
}) => {
  const { tictacBoard } = board;

  await page.goto('https://tic-tac-toe-tau-lyart-50.vercel.app/');

  const cells = tictacBoard.getByRole('button');
  await expect(cells).toHaveCount(9);
  const count = await cells.count();
  for (let i = 0; i < count; i++) {
    await expect(cells.nth(i)).toBeEnabled();
  }
});

test('Verify that valid moves (empty cells) are accepted', async ({
  page,
  board,
}) => {
  const { tictacBoard } = board;

  await page.goto('https://tic-tac-toe-tau-lyart-50.vercel.app/');
  const cellOne = page.getByRole('button', { name: 'Cell 1' });
  console.log(board.tictacBoard);
  // Click the 1st cell in the grid.
  await cellOne.click();
  await tictacBoard.getByRole('button', { name: 'Cell 2' }).click();
  await tictacBoard.getByRole('button', { name: 'Cell 3' }).click();

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
