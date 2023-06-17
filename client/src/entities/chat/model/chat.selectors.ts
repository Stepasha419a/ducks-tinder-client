import { createSelector } from '@reduxjs/toolkit';

export const selectUserChat = createSelector(
  [
    (state: RootState) => state.user.currentUser.id,
    (state: RootState) => state.user.currentUser.name,
    (state: RootState) => state.user.currentUser.pictures[0],
    (state: RootState) => state.chat.currentMessages,
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
  ],
  (_id, name, avatar, messages, chats, currentChatId) => ({
    currentChatUserObj: { _id, name, avatar },
    messages,
    currentChat: chats.find((chat) => chat.id === currentChatId),
  })
);

export const selectChatList = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
    (state: RootState) => state.chat.isLoading,
  ],
  (chats, currentChatId, isLoading) => ({
    chats,
    currentChatId,
    isLoading,
  })
);
