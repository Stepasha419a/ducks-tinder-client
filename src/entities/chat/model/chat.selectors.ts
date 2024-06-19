import { createSelector } from '@reduxjs/toolkit';

export const selectMessages = createSelector(
  [
    (state: RootState) => state.chat.messages,
    (state: RootState) => state.chat.isMessagesLoading,
    (state: RootState) => state.chat.isMessagesEnded,
  ],
  (messages, isMessagesLoading, isMessagesEnded) => ({
    messagesLength: messages.length,
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

export const selectCurrentChat = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
  ],
  (chats, currentChatId) => chats.find((chat) => chat.id === currentChatId)
);

export const selectCurrentMessagesLength = createSelector(
  [(state: RootState) => state.chat.messages],
  (messages) => messages.length
);

export const selectBlockedActiveChat = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
  ],
  (chats, currentChatId) => {
    const currentChat = chats.find((chat) => chat.id === currentChatId);
    return {
      blocked: currentChat?.blocked,
      blockedById: currentChat?.blockedById,
    };
  }
);
