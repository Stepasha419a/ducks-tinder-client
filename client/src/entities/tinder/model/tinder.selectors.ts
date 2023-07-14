import { createSelector } from '@reduxjs/toolkit';

export const selectTinderData = createSelector(
  [
    (state: RootState) => state.tinder.tinderUser,
    (state: RootState) => state.tinder.isFailed,
  ],
  (tinderUser, isFailed) => ({
    tinderUser,
    isFailed,
  })
);
