import type { Picture } from '@shared/api/interfaces';
import { createSelector } from '@reduxjs/toolkit';
import { getIsNewMessages, sortChats } from '../lib';

export const selectMessages = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
    (state: RootState) => state.chat.isMessagesInitialLoading,
    (state: RootState) => state.chat.maxMessagesCount,
    (state: RootState) => state.chat.repliedMessage,
    (state: RootState) => state.chat.currentMessage,
    (state: RootState) => state.chat.isMessageEditing,
  ],
  (
    chats,
    currentChatId,
    isMessagesInitialLoading,
    maxMessagesCount,
    repliedMessage,
    currentMessage,
    isMessageEditing
  ) => ({
    messagesLength: chats.find((chat) => chat.id === currentChatId)!.messages
      .length,
    isMessagesInitialLoading,
    maxMessagesCount,
    messages: chats.find((chat) => chat.id === currentChatId)!.messages,
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

export const selectCurrentMessagesLength = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
  ],
  (chats, currentChatId) =>
    chats.find((chat) => chat.id === currentChatId)?.messages.length
);

export const selectRepliedMessage = createSelector(
  [
    (state: RootState) => state.user.currentUser.id,
    (state: RootState) => state.user.currentUser.name,
    (state: RootState) =>
      state.user.currentUser.pictures[0] as Picture | undefined,
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
  ],
  (id, name, avatar, chats, currentChatId) => ({
    currentChatUserObj: { id, name, avatar },
    currentChat: chats.find((chat) => chat.id === currentChatId),
  })
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
      currentChatUser: currentChat?.users[0],
    };
  }
);

export const selectNewMessageChatsCount = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
    (state: RootState) => state.user.currentUser.id,
  ],
  (chats, currentChatId, currentUserId) =>
    chats.reduce((total, chat) => {
      const isActive = chat.id === currentChatId;
      const isOwn =
        chat.messages[chat.messages.length - 1]?.userId === currentUserId;
      return getIsNewMessages(chat, isActive, !isOwn) ? total + 1 : total;
    }, 0)
);
