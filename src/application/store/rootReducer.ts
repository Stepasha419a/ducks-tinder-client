import { authReducer } from '@entities/user';
import { chatReducer } from '@entities/chat';
import { settingReducer } from '@entities/setting';
import { tinderReducer } from '@entities/user';
import { userReducer } from '@entities/user';
import { themeReducer } from '@shared/model';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  chat: chatReducer,
  setting: settingReducer,
  tinder: tinderReducer,
  theme: themeReducer,
});
