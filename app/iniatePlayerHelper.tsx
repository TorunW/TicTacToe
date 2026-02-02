export const iniatePlayerHelper = (setPlayers: (param: any) => void) => {
  const playerArray = [
    { id: 1, name: 'PlayerOne', active: true, score: [], hasWon: false },
    { id: 2, name: 'Player Two', active: false, score: [], hasWon: false },
  ];
  setPlayers(playerArray);
};
