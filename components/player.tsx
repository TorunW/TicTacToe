import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../store/store';
import styles from '../styles/players.module.css';

const Player = (): ReactElement => {
  const players = useStoreState((state) => state.players);
  const setPlayers = useStoreActions((actions) => actions.setPlayers);
  const currentPlayer = useState(players.)
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

  const displayPlayers = players.map((player: { active: boolean; name: string  }) => {
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
