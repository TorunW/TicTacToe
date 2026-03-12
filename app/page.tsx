import Grid from '../components/grid';
import Player from '../components/player';

export default function Home() {
  return (
    <div className='h-screen w-screen items-center justify-center flex flex-col gap-20 bg-slate-950'>
      <a
        href='https://www.notion.so/TicTacToe-Testing-Playground-2b7b720eca55802f96cbed0fb31ad719?source=copy_link'
        target='_blank'
        rel='noopener noreferrer'
        className='bg-slate-600 text-sm md:text-base hover:bg-slate-700 hover:cursor-pointer text-slate-200 font-bold py-2 px-4 rounded inline-flex items-center'
      >
        Click here to see testing
      </a>
      <Player />
      <Grid />
    </div>
  );
}
