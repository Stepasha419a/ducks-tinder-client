import { authReducer } from '@entities/user';
import { chatReducer } from '@entities/chat';
import { tinderReducer } from '@entities/user';
import { userReducer } from '@entities/user';
import { themeReducer } from '@shared/model';
import { combineReducers } from '@reduxjs/toolkit';
import { pairReducer } from '@/entities/user';

export const rootReducer = combineReducers({
  user: userReducer,
  pair: pairReducer,
  auth: authReducer,
  chat: chatReducer,
  tinder: tinderReducer,
  theme: themeReducer,
});
