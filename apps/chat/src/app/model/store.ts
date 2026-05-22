import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer';

export const chatStore = configureStore({
  reducer: rootReducer,
});
