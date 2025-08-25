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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.disabled = true;
  };

  const addNumberToArray = (squareNum: number) => {
    const currentPlayerId = currentPlayer.id;

    players.find((player, index) =>
      currentPlayerId === player.id ? players[index].score.push(squareNum) : ''
    );

    //TODO: before change, check winning pattern. If player wins game finish instead of change player, if no winn change
    changePlayer();
  };

  const changePlayer = () => {
    const toggleActive = players.map((player) =>
      player.active === true
        ? { ...player, active: false }
        : { ...player, active: true }
    );
    setPlayers(toggleActive);
  };

  const mapGrid = gridArray.map((squareNum, index) => (
    <div className={styles.square} key={index}>
      <button
        value={squareNum}
        onClick={(e) => {
          addNumberToArray(squareNum);
          handleClick(e);
        }}
      >
        {squareNum}
      </button>
    </div>
  ));

  return <div className={styles.grid}>{mapGrid}</div>;
}
