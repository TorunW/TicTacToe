'use client';
import styles from '../../styles/page.module.css';
import { useState } from 'react';
import Grid from '../../components/grid';

interface Player {
  alias: string;
  playedSquares: Array<number>;
  active: boolean;
}

export default function Home() {
  const playerOne: Player = {
    alias: 'PlayerOne',
    playedSquares: [],
    active: true,
  };

  const playerTwo: Player = {
    alias: 'PlayerTwo',
    playedSquares: [],
    active: false,
  };

  return (
    <div className={styles.page}>
      <Grid />
    </div>
  );
}
