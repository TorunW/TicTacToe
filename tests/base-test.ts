/* eslint-disable react-hooks/rules-of-hooks */
import { BoardFixture } from '@/fixtures/board';
import { test as base } from '@playwright/test';

// Declare the types of your fixtures.
type MyFixtures = {
  board: BoardFixture;
};

export const test = base.extend<MyFixtures>({
  board: async ({ page }, use) => {
    await use(new BoardFixture(page));
  },
});
export { expect } from '@playwright/test';
