import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';
import chatSlice from './chat/chat.slice';
import notificationsSlice from './notifications/notifications.slice';
import settingsSlice from './settings/settings.slice';
import tinderSlice from './tinder/tinder.slice';
import usersSlice from './users/users.slice';

const store = configureStore({
  reducer: {
    usersPage: usersSlice,
    authPage: authSlice,
    chatPage: chatSlice,
    notifications: notificationsSlice,
    settings: settingsSlice,
    tinderPage: tinderSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
