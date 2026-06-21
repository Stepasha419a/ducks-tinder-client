import type { Reducer } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import { pairReducer, tinderReducer } from '@entities/user';
import { chatReducer } from 'chatApp/models';
import { userReducer } from '@entities/user/model/user';

export const rootReducer = combineReducers({
  user: userReducer,
  pair: pairReducer,
  chat: chatReducer as Reducer<unknown>,
  tinder: tinderReducer,
});
