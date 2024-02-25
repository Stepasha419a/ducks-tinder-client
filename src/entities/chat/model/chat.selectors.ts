import { createSelector } from '@reduxjs/toolkit';
import { getIsNewMessages, sortChats } from '../lib';

export const selectMessages = createSelector(
  [
    (state: RootState) => state.chat.messagesPagination,
    (state: RootState) => state.chat.isMessagesInitialLoading,
    (state: RootState) => state.chat.skipMessagesCount,
    (state: RootState) => state.chat.repliedMessage,
    (state: RootState) => state.chat.currentMessage,
    (state: RootState) => state.chat.isMessageEditing,
  ],
  (
    messagesPagination,
    isMessagesInitialLoading,
    skipMessagesCount,
    repliedMessage,
    currentMessage,
    isMessageEditing
  ) => ({
    messagesLength: messagesPagination?.messages.length,
    isMessagesInitialLoading,
    skipMessagesCount,
    messages: messagesPagination?.messages,
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
  [(state: RootState) => state.chat.messagesPagination],
  (messagesPagination) => messagesPagination?.messages.length
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
    (state: RootState) => state.user.currentUser.id,
    (state: RootState) => state.chat.messagesPagination,
  ],
  (chats, currentChatId, currentUserId, messagesPagination) =>
    chats.reduce((total, chat) => {
      const isActive = chat.id === currentChatId;
      const isOwn =
        messagesPagination?.messages[messagesPagination.messages.length - 1]
          ?.userId === currentUserId;
      return getIsNewMessages(chat, isActive, !isOwn) ? total + 1 : total;
    }, 0)
);
