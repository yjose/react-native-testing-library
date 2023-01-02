import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';
import counterSlice from '../feature/counter/counterSlice';

const reducer = {
  counter: counterSlice,
};

export type RootState = StateFromReducersMapObject<typeof reducer>;

export function buildStore(preloadedState?: RootState) {
  return configureStore({
    reducer,
    preloadedState,
  });
}

export const store = buildStore();
export type AppDispatch = typeof store.dispatch;
