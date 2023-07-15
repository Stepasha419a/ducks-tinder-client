import { authReducer } from '@entities/auth';
import { chatReducer } from '@entities/chat';
import { settingReducer } from '@entities/setting';
import { tinderReducer } from '@entities/tinder';
import { userReducer } from '@entities/user';
import { themeReducer } from '@entities/theme';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  chat: chatReducer,
  setting: settingReducer,
  tinder: tinderReducer,
  theme: themeReducer,
});
