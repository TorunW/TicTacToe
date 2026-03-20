'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../app/store/store';
import { iniatePlayerHelper } from '@/app/iniatePlayerHelper';
import o from '../public/o.svg';
import x from '../public/x.svg';

export default function Grid() {
  const players = useStoreState((state) => state.players);
  const setPlayers = useStoreActions((actions) => actions.setPlayers);
  const currentPlayer = useStoreState((state) => state.currentPlayer);
  const setCurrentPlayer = useStoreActions(
    (actions) => actions.setCurrentPlayer,
  );
  const [winningMessageDisplay, setWinningMessageDisplay] = useState(false);
  const [drawMessageDisplay, setDrawMessageDisplay] = useState(false);
  type CellValue = 'X' | 'O' | null;
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const gridArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
  }, [players, setCurrentPlayer]);

  const checkWinningPattern = (playerMoves: Array<number>) => {
    const isPlayerWinning = winningPatterns.some((pattern) =>
      pattern.every((num) => playerMoves.includes(num)),
    );

    const playersArrLength = players[0].score.length + players[1].score.length;

    if (isPlayerWinning === true) {
      winningScenario();
    } else if (isPlayerWinning === false && playersArrLength >= 9) {
      drawScenario();
    } else {
      changePlayer();
    }
  };

  const onFieldClick = (fieldValue: number) => {
    const currentPlayerId = currentPlayer.id;
    const index = fieldValue - 1;

    const symbol: CellValue = currentPlayer.name === 'Player X' ? 'X' : 'O';

    const newBoard = [...board];
    newBoard[index] = symbol;
    setBoard(newBoard);
    players.find((player, index) => {
      if (currentPlayerId === player.id) {
        players[index].score.push(fieldValue);
        const playerMoves = player.score;
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
    setWinningMessageDisplay(true);
  };

  const drawScenario = () => {
    setDrawMessageDisplay(true);
  };
  /* 
  const mapGrid = gridArray.map((fieldValue) => {
    const index = fieldValue - 1;
    const cellValue = board[index];

    return (
      <div
        className='flex items-center justify-center
      [&:nth-child(-n+3)_button]:border-t-0
      [&:nth-child(n+7)_button]:border-b-0
      [&:nth-child(3n+1)_button]:border-l-0
      [&:nth-child(3n)_button]:border-r-0'
        key={fieldValue}
        role='gridcell'
        aria-label={`Cell ${fieldValue}`}
      >
        <button
          disabled={
            cellValue !== null || winningMessageDisplay || drawMessageDisplay
          }
          onClick={() => onFieldClick(fieldValue)}
          className='w-30 h-30 border border-sky-300 
          flex items-center justify-center disabled:cursor-not-allowed 
          disabled:bg-slate-950
          disabled:hover:bg-slate-950 disabled:hover:opacity-100 hover:bg-sky-950/40'
          aria-label={`Cell ${fieldValue}`}
        >
          {cellValue === 'X' && (
            <Image src={x} alt='X' width={45} height={45} />
          )}
          {cellValue === 'O' && (
            <Image src={o} alt='O' width={45} height={45} />
          )}
        </button>
      </div>
    );
  }); */

  const chunkArray = (arr: Array<number>, size: number) =>
    Array.from({ length: arr.length / size }, (_, i) =>
      arr.slice(i * size, i * size + size),
    );

  const rows = chunkArray(gridArray, 3);

  const mapGrid = rows.map((row, rowIndex) => (
    <div key={rowIndex} role='row' className='grid grid-cols-3 gap-0'>
      {row.map((fieldValue: number, colIndex: number) => {
        const index = fieldValue - 1;
        const cellValue = board[index];

        return (
          <div
            className='flex items-center justify-center'
            key={fieldValue}
            aria-rowindex={rowIndex + 1}
            aria-colindex={colIndex + 1}
            role='gridcell'
            aria-label={`Cell ${fieldValue}`}
          >
            <button
              disabled={
                cellValue !== null ||
                winningMessageDisplay ||
                drawMessageDisplay
              }
              onClick={() => onFieldClick(fieldValue)}
              className={`w-30 h-30 border border-sky-300 flex items-center justify-center ${rowIndex === 0 ? 'border-t-0' : ''} ${rowIndex === 2 ? 'border-b-0' : ''} ${colIndex === 0 ? 'border-l-0' : ''} ${colIndex === 2 ? 'border-r-0' : ''} disabled:cursor-not-allowed disabled:bg-slate-950 disabled:hover:bg-slate-950 disabled:hover:opacity-100 hover:bg-sky-950/40`}
              aria-label={`Cell ${fieldValue}`}
            >
              {cellValue === 'X' && (
                <Image src={x} alt='X' width={45} height={45} />
              )}
              {cellValue === 'O' && (
                <Image src={o} alt='O' width={45} height={45} />
              )}
            </button>
          </div>
        );
      })}
    </div>
  ));

  return (
    <div className='relative flex flex-col items-center max-w-120 '>
      <div role='grid'>{mapGrid}</div>

      {winningMessageDisplay || drawMessageDisplay === true ? (
        <div className='fixed inset-0 bg-black/90 flex items-center justify-center overflow-hidden'>
          <div className='bg-slate-900 rounded-lg p-6 max-w-sm w-full min-h-[120px] flex flex-col items-center justify-center gap-6 text-center border border-sky-300'>
            <p className='text-lg font-semibold text-stone-200'>
              {winningMessageDisplay === true
                ? `${currentPlayer.name} has won the game!`
                : `It is a draw`}{' '}
            </p>
            <button
              onClick={() => {
                iniatePlayerHelper(setPlayers);
                setWinningMessageDisplay(false);
                setDrawMessageDisplay(false);
                setBoard(Array(9).fill(null));
              }}
              className='px-4 py-2 bg-sky-500 text-stone-200 rounded w-2/4 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500'
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
