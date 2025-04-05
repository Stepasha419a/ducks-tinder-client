import { chatReducer } from '@ducks-tinder-client/common';
import { authReducer } from '@ducks-tinder-client/common';
import { userReducer } from '@ducks-tinder-client/common';
import { combineReducers } from '@reduxjs/toolkit';
import { tinderReducer } from '@entities/user';
import { pairReducer } from '@entities/user';

export const rootReducer = combineReducers({
  user: userReducer,
  pair: pairReducer,
  auth: authReducer,
  chat: chatReducer,
  tinder: tinderReducer,
});
