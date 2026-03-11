import type { chatStore } from '@app/model/store';
import type { store } from '@ducks-tinder-client/common';

declare global {
  export type RootStore = ReturnType<typeof store>;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;

  export type ChatStore = ReturnType<typeof chatStore>;
  export type ChatState = ReturnType<typeof chatStore.getState>;
  export type ChatDispatch = typeof chatStore.dispatch;
}
