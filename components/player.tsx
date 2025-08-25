'use client';
import { useEffect, useState } from 'react';

import { useStoreActions, useStoreState } from '../app/store/store';
import styles from '../styles/players.module.css';

const Player = () => {
  const players = useStoreState((state) => state.players);
  const setPlayers = useStoreActions((actions) => actions.setPlayers);
  const setCurrentPlayer = useStoreActions(
    (actions) => actions.setCurrentPlayer
  );

  const iniatePlayers = () => {
    const playerArray = [
      { id: 1, name: 'PlayerOne', active: true, score: [] },
      { id: 2, name: 'Player Two', active: false, score: [] },
    ];

    setPlayers(playerArray);
  };

  useEffect(() => {
    if (players.length === 0) {
      iniatePlayers();
    } else {
      const findCurrentPlayerIndex = players.findIndex((player, index) =>
        player.active === true ? index + 1 : ''
      );
      setCurrentPlayer(players[findCurrentPlayerIndex]);
    }
  }, [players, iniatePlayers]);

  const displayPlayers = players.map(
    (player: { active: boolean; name: string }) => {
      return (
        <div key={player.name}>
          <p
            className={
              player.active === true
                ? styles.playerActive
                : styles.playerInactive
            }
          >
            {player.name}
          </p>
        </div>
      );
    }
  );

  return <div>{displayPlayers}</div>;
};

export default Player;
