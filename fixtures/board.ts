import { Locator, Page } from '@playwright/test';

export class BoardFixture {
  public readonly tictacBoard: Locator;
  public readonly getAllCells: () => Promise<Locator[]>;

  constructor(public readonly page: Page) {
    this.tictacBoard = page.getByRole('grid');
    this.getAllCells = async () => {
      return await this.tictacBoard.getByRole('gridcell').all();
    };
  }
}
