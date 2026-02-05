'use client';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../app/store/store';
import { iniatePlayerHelper } from '@/app/iniatePlayerHelper';

const Player = () => {
  const players = useStoreState((state) => state.players);
  const setPlayers = useStoreActions((actions) => actions.setPlayers);

  const setCurrentPlayer = useStoreActions(
    (actions) => actions.setCurrentPlayer,
  );

  useEffect(() => {
    if (players.length === 0) {
      iniatePlayerHelper(setPlayers);
    } else {
      const findCurrentPlayerIndex = players.findIndex((player, index) =>
        player.active === true ? index + 1 : '',
      );
      setCurrentPlayer(players[findCurrentPlayerIndex]);
    }
  }, [players, iniatePlayerHelper]);

  const displayPlayers = players.map(
    (player: { active: boolean; name: string }) => {
      return (
        <div key={player.name}>
          <p
            className={`text-xl ${player.active === true ? 'text-sky-300 ' : 'text-slate-500'}`}
          >
            {player.name}
          </p>
        </div>
      );
    },
  );

  return (
    <div className='flex flex-row w-full justify-between'>{displayPlayers}</div>
  );
};

export default Player;
