'use client';
import styles from '../styles/page.module.css';
import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../app/store/store';

export default function Grid() {
  const players = useStoreState((state) => state.players);
  const setPlayers = useStoreActions((actions) => actions.setPlayers);
  const currentPlayer = useStoreState((state) => state.currentPlayer);

  const setCurrentPlayer = useStoreActions(
    (actions) => actions.setCurrentPlayer
  );
  const gridArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    const findCurrentPlayerIndex = players.findIndex((player, index) =>
      player.active === true ? index + 1 : ''
    );
    setCurrentPlayer(players[findCurrentPlayerIndex]);
  }, [players]);

  const changePlayer = () => {
    //add the number to players array
    // make the number button disabled aka not able to click on it (fo)
    //check winning patterns()
    //if no win then next player
    let toggleActive = players.map((player) =>
      player.active === true
        ? { ...player, active: false }
        : { ...player, active: true }
    );
    setPlayers(toggleActive);
  };

  const mapGrid = gridArray.map((squareNum, index) => (
    <div className={styles.square} key={index}>
      <button value={squareNum} onClick={() => changePlayer()}>
        {squareNum}
      </button>
    </div>
  ));

  return <div className={styles.grid}>{mapGrid}</div>;
}
