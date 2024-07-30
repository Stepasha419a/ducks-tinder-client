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
    (state: RootState) => state.chat.currentChatId,
    (state: RootState) => state.chat.isLoading,
  ],
  (chats, currentChatId, isLoading) => ({
    chats,
    currentChatId,
    isLoading,
  })
);

export const selectCurrentMessagesLength = createSelector(
  [(state: RootState) => state.chat.messages],
  (messages) => messages.length
);
