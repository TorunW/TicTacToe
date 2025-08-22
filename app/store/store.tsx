import { createStore, action, createTypedHooks, Store } from 'easy-peasy';
import { Action } from 'easy-peasy';

interface Player {
  name: string;
  active: boolean;
  score: Array<number>;
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
    name: '',
    active: false,
    score: [],
  },
  setCurrentPlayer: action((state, payload) => {
    state.currentPlayer = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
