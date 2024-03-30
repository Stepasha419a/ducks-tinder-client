import { createSelector } from '@reduxjs/toolkit';
import { getIsNewMessages } from '../lib';

export const selectMessages = createSelector(
  [
    (state: RootState) => state.chat.messages,
    (state: RootState) => state.chat.isMessagesInitialLoading,
    (state: RootState) => state.chat.isMessagesEnded,
  ],
  (messages, isMessagesInitialLoading, isMessagesEnded) => ({
    messagesLength: messages.length,
    messages,
    isMessagesInitialLoading,
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

export const selectChatProfile = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
    (state: RootState) => state.chat.chatMember,
  ],
  (chats, currentChatId, chatMember) => {
    const currentChat = chats.find((chat) => chat.id === currentChatId);
    return {
      blocked: currentChat?.blocked,
      blockedById: currentChat?.blockedById,
      chatMember,
    };
  }
);

export const selectNewMessageChatsCount = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
    (state: RootState) => state.user.currentUser!.id,
  ],
  (chats, currentChatId, currentUserId) =>
    chats.reduce((total, chat) => {
      const isActive = chat.id === currentChatId;
      const isCompanion = chat.lastMessage?.userId !== currentUserId;
      return getIsNewMessages(chat, isActive, isCompanion) ? total + 1 : total;
    }, 0)
);
