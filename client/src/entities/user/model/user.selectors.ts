import type { RootState } from '@/application/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectUserPairs = createSelector(
  [
    (state: RootState) => state.user.currentUser.pairs,
    (state: RootState) => state.user.pairs,
  ],
  (pairIds, pairs) => ({ pairIds, pairs })
);

export const selectUserChatsInfo = createSelector(
  [
    (state: RootState) => state.user.currentUser._id,
    (state: RootState) => state.user.currentUser.chats.length,
  ],
  (currentUserId, chatsLength) => ({ currentUserId, chatsLength })
);
