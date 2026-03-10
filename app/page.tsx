import Link from 'next/link';
import Grid from '../components/grid';
import Player from '../components/player';

export default function Home() {
  return (
    <div className='h-screen w-screen items-center justify-center flex flex-col gap-20 bg-slate-950'>
      <Link
        href={'/testing'}
        className='bg-slate-600 text-sm md:text-base hover:bg-slate-700 hover:cursor-pointer text-slate-200 font-bold py-2 px-4 rounded inline-flex items-center'
      >
        Click here to see testing
      </Link>
      <Player />
      <Grid />
    </div>
  );
}
