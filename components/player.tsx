'use client';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../app/store/store';
import styles from '../styles/players.module.css';
import { iniatePlayerHelper } from '@/app/iniatePlayerHelper';

const Player = () => {
  const players = useStoreState((state) => state.players);
  const setPlayers = useStoreActions((actions) => actions.setPlayers);

  const setCurrentPlayer = useStoreActions(
    (actions) => actions.setCurrentPlayer,
  );

  useEffect(() => {
    if (players.length === 0) {
      iniatePlayerHelper(setPlayers);
    } else {
      const findCurrentPlayerIndex = players.findIndex((player, index) =>
        player.active === true ? index + 1 : '',
      );
      setCurrentPlayer(players[findCurrentPlayerIndex]);
    }
  }, [players, iniatePlayerHelper]);

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
    },
  );

  return <div>{displayPlayers}</div>;
};

export default Player;
