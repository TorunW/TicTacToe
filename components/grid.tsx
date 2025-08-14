'use client';
import styles from '../styles/page.module.css';
import React from 'react';

export default function Grid() {
  const gridArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const mapGrid = gridArray.map((squareNum, index) => (
    <div className={styles.square} key={index}>
      <button value={squareNum} onClick={() => console.log(index)}>
        {squareNum}
      </button>
    </div>
  ));

  console.log(mapGrid), 'juhu';

  return <div className={styles.grid}>{mapGrid}</div>;
}
