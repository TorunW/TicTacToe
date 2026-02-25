import { createStore, action, createTypedHooks } from 'easy-peasy';
import { Action } from 'easy-peasy';

interface Player {
  id: number;
  name: string;
  active: boolean;
  score: Array<number>;
  hasWon: boolean;
}

interface StoreModel {
  players: Player[];
  setPlayers: Action<StoreModel, Player[]>;
  currentPlayer: Player;
  setCurrentPlayer: Action<StoreModel, Player>;
}

export const store = createStore<StoreModel>({
  players: [],
  setPlayers: action((state, payload) => {
    state.players = payload;
  }),
  currentPlayer: {
    id: NaN,
    name: '',
    active: false,
    score: [],
    hasWon: false,
  },
  setCurrentPlayer: action((state, payload) => {
    state.currentPlayer = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
