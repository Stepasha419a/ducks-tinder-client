import { createSelector } from '@reduxjs/toolkit';

export const selectMessages = createSelector(
  [
    (state: RootState) => state.chat.messages,
    (state: RootState) => state.chat.isMessagesLoading,
    (state: RootState) => state.chat.isMessagesEnded,
  ],
  (messages, isMessagesLoading, isMessagesEnded) => ({
    messages,
    isMessagesLoading,
    isMessagesEnded,
  })
);

export const selectChatList = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.activeChat,
    (state: RootState) => state.chat.isLoading,
  ],
  (chats, activeChat, isLoading) => ({
    chats,
    activeChat,
    isLoading,
  })
);

export const selectCurrentMessagesLength = createSelector(
  [(state: RootState) => state.chat.messages],
  (messages) => messages.length
);
