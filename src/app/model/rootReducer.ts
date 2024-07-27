import { combineReducers } from '@reduxjs/toolkit';
import { chatReducer } from '@entities/chat';
import { authReducer } from '@entities/user';
import { tinderReducer } from '@entities/user';
import { userReducer } from '@entities/user';
import { pairReducer } from '@entities/user';
import { themeReducer } from '@shared/model';

export const rootReducer = combineReducers({
  user: userReducer,
  pair: pairReducer,
  auth: authReducer,
  chat: chatReducer,
  tinder: tinderReducer,
  theme: themeReducer,
});
