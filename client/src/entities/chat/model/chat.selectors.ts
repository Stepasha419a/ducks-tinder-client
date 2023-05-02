import { createSelector } from '@reduxjs/toolkit';

export const selectUserChat = createSelector(
  [
    (state: RootState) => state.user.currentUser._id,
    (state: RootState) => state.user.currentUser.name,
    (state: RootState) => state.user.currentUser.pictures.avatar,
  ],
  (_id, name, avatar) => ({ _id, name, avatar })
);

export const selectChatList = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
    (state: RootState) => state.chat.chatsUsers,
    (state: RootState) => state.chat.isLoading,
  ],
  (chats, currentChatId, chatsUsers, isLoading) => ({
    chats,
    currentChatId,
    chatsUsers,
    isLoading,
  })
);
