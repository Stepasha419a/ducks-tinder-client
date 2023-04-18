import type { RootState } from '@/application/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectUserChat = createSelector(
  [
    (state: RootState) => state.user.currentUser._id,
    (state: RootState) => state.user.currentUser.name,
    (state: RootState) => state.user.currentUser.pictures.avatar,
  ],
  (_id, name, avatar) => ({ _id, name, avatar })
);
