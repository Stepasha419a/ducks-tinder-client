/* eslint-disable @typescript-eslint/no-useless-empty-export */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { store } from './store';

declare global {
  export type RootStore = ReturnType<typeof store>;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
}

export {};
