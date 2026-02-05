import Grid from '../components/grid';
import Player from '../components/player';

export default function Home() {
  return (
    <div className='justify-center align-center flex flex-col gap-30 bg-slate-950'>
      <Player />
      <Grid />
    </div>
  );
}
