import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import authReducer from './auth/auth.slice';
import chatReducer from './chat/chat.slice';
import notificationsReducer from './notificationsSlice';
import usersReducer from './users/users.slice';

let rootReducer = combineReducers({
  usersPage: usersReducer,
  authPage: authReducer,
  chatPage: chatReducer,
  notifications: notificationsReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
