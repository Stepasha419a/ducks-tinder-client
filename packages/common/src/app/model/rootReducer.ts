import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from '@entities/user';

export const rootReducer = combineReducers({
  user: userReducer,
});
