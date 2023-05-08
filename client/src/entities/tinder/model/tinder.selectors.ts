import { createSelector } from '@reduxjs/toolkit';

export const selectTinderData = createSelector(
  [
    (state: RootState) => state.tinder.tinderUsers,
    (state: RootState) => state.tinder.currentTinderUsersIndex,
    (state: RootState) => state.tinder.isFailed,
  ],
  (tinderUsers, currentTinderUsersIndex, isFailed) => ({
    tinderUsers,
    currentTinderUsersIndex,
    isFailed,
  })
);
