import authSlice from '@/entities/auth/model/auth.slice';
import chatSlice from '@/entities/chat/model/chat.slice';
import notificationsSlice from '@/entities/notifications/model/notifications.slice';
import settingsSlice from '@/entities/settings/settings.slice';
import tinderSlice from '@/entities/tinder/model/tinder.slice';
import usersSlice from '@/entities/users/model/users.slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  usersPage: usersSlice,
  authPage: authSlice,
  chatPage: chatSlice,
  notifications: notificationsSlice,
  settings: settingsSlice,
  tinderPage: tinderSlice,
});
