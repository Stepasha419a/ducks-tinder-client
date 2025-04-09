import { combineReducers } from '@reduxjs/toolkit';

import { authReducer , chatReducer , userReducer } from '@ducks-tinder-client/common';

import { pairReducer,tinderReducer  } from '@entities/user';


export const rootReducer = combineReducers({
  user: userReducer,
  pair: pairReducer,
  auth: authReducer,
  chat: chatReducer,
  tinder: tinderReducer,
});
