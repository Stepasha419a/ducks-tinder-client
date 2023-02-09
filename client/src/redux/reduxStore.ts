import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import notificationsSlice from './notificationsSlice';
import usersReducer from './usersReducer';

let rootReducer = combineReducers({
  usersPage: usersReducer,
  authPage: authReducer,
  chatPage: chatReducer,
  notifications: notificationsSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
