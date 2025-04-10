import type { store } from '@ducks-tinder-client/common';

declare global {
  export type RootStore = ReturnType<typeof store>;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
}
