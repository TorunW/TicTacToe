import Grid from '../components/grid';
import Player from '../components/player';

export default function Home() {
  return (
    <div className='w-90% h-screen justify-center align-center flex flex-col bg-slate-950'>
      <Player />
      <Grid />
    </div>
  );
}
