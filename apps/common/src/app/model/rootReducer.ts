import { combineReducers } from '@reduxjs/toolkit';
import { chatReducer } from '@entities/chat';

export const rootReducer = combineReducers({
  chat: chatReducer,
});
