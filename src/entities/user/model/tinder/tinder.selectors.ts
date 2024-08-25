import { createSelector } from '@reduxjs/toolkit';

export const selectTinderData = createSelector(
  [
    (state: RootState) => state.tinder.tinderUsers,
    (state: RootState) => state.tinder.isFailed,
  ],
  (tinderUsers, isFailed) => ({
    tinderUsers,
    isFailed,
  })
);
