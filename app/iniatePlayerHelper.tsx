type Player = {
  id: number;
  name: string;
  active: boolean;
  score: never[];
  hasWon: boolean;
};

export const iniatePlayerHelper = (setPlayers: (param: Player[]) => void) => {
  const playerArray = [
    { id: 1, name: 'Player X', active: true, score: [], hasWon: false },
    { id: 2, name: 'Player O', active: false, score: [], hasWon: false },
  ];
  setPlayers(playerArray);
};
