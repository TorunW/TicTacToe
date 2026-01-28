'use client';
import styles from '../styles/page.module.css';
import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../app/store/store';
import { iniatePlayerHelper } from '@/app/iniatePlayerHelper';

export default function Grid() {
  const players = useStoreState((state) => state.players);
  const setPlayers = useStoreActions((actions) => actions.setPlayers);
  const currentPlayer = useStoreState((state) => state.currentPlayer);
  const setCurrentPlayer = useStoreActions(
    (actions) => actions.setCurrentPlayer,
  );
  const [displayWinningMessage, setDisplayWinningMessage] = useState(false);
  const gridArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const winningPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  useEffect(() => {
    const findCurrentPlayerIndex = players.findIndex((player, index) =>
      player.active === true ? index + 1 : '',
    );
    setCurrentPlayer(players[findCurrentPlayerIndex]);
  }, [players]);

  const handleDisableBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.currentTarget.disabled = true;
  };

  const checkWinningPattern = (playerMoves: Array<number>) => {
    const isPlayerWinning = winningPatterns.some((pattern, index) =>
      pattern.every((num) => playerMoves.includes(num)),
    );
    isPlayerWinning ? winningScenario() : changePlayer();
  };

  const addMoveToArr = (fieldValue: number) => {
    const currentPlayerId = currentPlayer.id;

    players.find((player, index) => {
      if (currentPlayerId === player.id) {
        players[index].score.push(fieldValue);
        let playerMoves = player.score;
        checkWinningPattern(playerMoves);
      }
    });
  };

  const changePlayer = () => {
    const toggleActive = players.map((player) =>
      player.active === true
        ? { ...player, active: false }
        : { ...player, active: true },
    );
    setPlayers(toggleActive);
  };

  const winningScenario = () => {
    players.find((player, index) => {
      if (currentPlayer.id === player.id) {
        players[index].hasWon = true;
      }
    });
    setDisplayWinningMessage(true);
  };

  const mapGrid = gridArray.map((fieldValue, index) => (
    <div className={styles.field} key={index}>
      <button
        value={fieldValue}
        disabled={displayWinningMessage === true ? true : false}
        onClick={(e) => {
          addMoveToArr(fieldValue);
          handleDisableBtn(e);
        }}
      >
        {fieldValue}
      </button>
    </div>
  ));

  return (
    <div className={styles.gridPage}>
      <div className={styles.gridContainer}>{mapGrid} </div>
      {displayWinningMessage === true ? (
        <div className={styles.overlay}>
          <div className={styles.messageBox}>
            {currentPlayer.name} has won the game!
            <br />
            <button
              onClick={() => {
                iniatePlayerHelper(setPlayers);
                setDisplayWinningMessage(false);
              }}
            >
              Restart game
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
