export const iniatePlayerHelper = (setPlayers: (param: any) => void) => {
  const playerArray = [
    { id: 1, name: 'Player X', active: true, score: [], hasWon: false },
    { id: 2, name: 'Player O', active: false, score: [], hasWon: false },
  ];
  setPlayers(playerArray);
};
