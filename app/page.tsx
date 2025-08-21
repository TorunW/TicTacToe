'use client';
import styles from '../styles/page.module.css';
import Grid from '../components/grid';
import { StoreProvider } from 'easy-peasy';
import { store } from '../store/store';
import Player from '../components/player';

export default function Home() {
  return (
    <StoreProvider store={store}>
      <div className={styles.page}>
        <Player />
        <Grid />
      </div>
    </StoreProvider>
  );
}
