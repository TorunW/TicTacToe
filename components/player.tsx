import { ReactElement, useEffect } from 'react';
import { useStoreActions, useStoreState } from '../store/store';
import styles from '../styles/players.module.css';

const Player = (): ReactElement => {
  const players = useStoreState((state) => state.players);
  const setPlayers = useStoreActions((actions) => actions.setPlayers);
  console.log(players, 'hahahah');

  useEffect(() => {
    if (players.length === 0) {
      iniatePlayers();
    }
  });

  const iniatePlayers = () => {
    const playerArray = [
      { name: 'Player One', active: true, score: [] },
      { name: 'Player Two', active: false, score: [] },
    ];
    setPlayers(playerArray);
  };

  const displayPlayers = players.map((player) => {
    return (
      <div>
        <p
          className={
            player.active === true ? styles.playerActive : styles.playerInactive
          }
        >
          {player.name}
        </p>
      </div>
    );
  });

  return <div>{displayPlayers}</div>;
};

export default Player;
