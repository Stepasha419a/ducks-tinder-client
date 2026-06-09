import type { Reducer } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from '@ducks-tinder-client/common';

import { pairReducer, tinderReducer } from '@entities/user';
import { chatReducer } from 'chatApp/models';

export const rootReducer = combineReducers({
  user: userReducer,
  pair: pairReducer,
  chat: chatReducer as Reducer<unknown>,
  tinder: tinderReducer,
});
