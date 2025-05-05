import { createSelector } from '@reduxjs/toolkit';

export const selectTinderData = createSelector(
  [
    (state: RootState) => state.tinder.tinderUsers,
    (state: RootState) => state.tinder.isFailed,
    (state: RootState) => state.tinder.isLoading,
    (state: RootState) => state.tinder.isReturnLoading,
  ],
  (tinderUsers, isFailed, isLoading, isReturnLoading) => ({
    tinderUsers,
    tinderUsersLength: tinderUsers.length,
    isFailed,
    isLoading,
    isReturnLoading,
  })
);
