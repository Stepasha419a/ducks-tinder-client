import { createSelector } from '@reduxjs/toolkit';

export const selectAvatar = createSelector(
  [
    (state: RootState) => state.user.currentUser?.pictures[0]?.name,
    (state: RootState) => state.user.currentUser?.id,
    (state: RootState) => state.user.currentUser?.name,
  ],
  (avatarName, currentUserId, currentUserName) => ({
    avatarName,
    currentUserId,
    currentUserName,
  })
);
