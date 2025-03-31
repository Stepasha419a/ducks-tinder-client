import { combineReducers } from '@reduxjs/toolkit';
import { chatReducer } from '@entities/chat';
import { authReducer, userReducer } from '@entities/user';

export const rootReducer = combineReducers({
  chat: chatReducer,
  auth: authReducer,
  user: userReducer,
});
