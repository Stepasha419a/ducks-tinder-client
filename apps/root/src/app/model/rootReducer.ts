import { chatReducer } from '@ducks-tinder-client/common';
import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '@entities/user';
import { tinderReducer } from '@entities/user';
import { userReducer } from '@entities/user';
import { pairReducer } from '@entities/user';

export const rootReducer = combineReducers({
  user: userReducer,
  pair: pairReducer,
  auth: authReducer,
  chat: chatReducer,
  tinder: tinderReducer,
});
