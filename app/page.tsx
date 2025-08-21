import styles from '../styles/page.module.css';
import Grid from '../components/grid';
import Player from '../components/player';

export default function Home() {
  return (
    <div className={styles.page}>
      <Player />
      <Grid />
    </div>
  );
}
