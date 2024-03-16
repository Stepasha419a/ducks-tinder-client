import { createSelector } from '@reduxjs/toolkit';
import { getIsNewMessages, sortChats } from '../lib';

export const selectMessages = createSelector(
  [
    (state: RootState) => state.chat.messages,
    (state: RootState) => state.chat.isMessagesInitialLoading,
    (state: RootState) => state.chat.isMessagesEnded,
    (state: RootState) => state.chat.skipMessagesCount,
    (state: RootState) => state.chat.repliedMessage,
    (state: RootState) => state.chat.currentMessage,
    (state: RootState) => state.chat.isMessageEditing,
  ],
  (
    messages,
    isMessagesInitialLoading,
    isMessagesEnded,
    skipMessagesCount,
    repliedMessage,
    currentMessage,
    isMessageEditing
  ) => ({
    messagesLength: messages.length,
    messages,
    isMessagesInitialLoading,
    isMessagesEnded,
    skipMessagesCount,
    repliedMessage,
    currentMessage,
    isMessageEditing,
  })
);

export const selectChatList = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
    (state: RootState) => state.chat.isLoading,
  ],
  (chats, currentChatId, isLoading) => ({
    chats: [...chats].sort(sortChats),
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
  ],
  (chats, currentChatId) => {
    const currentChat = chats.find((chat) => chat.id === currentChatId);
    return {
      blocked: currentChat?.blocked,
      blockedById: currentChat?.blockedById,
      chatName: currentChat?.name,
      chatAvatar: currentChat?.avatar,
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
