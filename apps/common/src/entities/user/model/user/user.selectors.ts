import type { Selector } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

interface SelectAvatarReturn {
  avatarName?: string;
  currentUserName?: string;
}

export const selectAvatar: Selector<RootState, SelectAvatarReturn> =
  createSelector(
    [
      (state: RootState) => state.user.currentUser?.pictures[0]?.name,
      (state: RootState) => state.user.currentUser?.name,
    ],
    (avatarName, currentUserName) => ({
      avatarName,
      currentUserName,
    })
  );
