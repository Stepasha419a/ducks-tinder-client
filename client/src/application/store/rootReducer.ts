import { authReducer } from '@entities/auth';
import { chatReducer } from '@entities/chat';
import { notificationReducer } from '@entities/notification';
import { settingReducer } from '@entities/setting';
import { tinderReducer } from '@entities/tinder';
import { userReducer } from '@entities/user';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  chat: chatReducer,
  notification: notificationReducer,
  setting: settingReducer,
  tinder: tinderReducer,
});
