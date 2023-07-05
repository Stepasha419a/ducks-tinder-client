import type { Picture } from '@/shared/api/interfaces';
import { createSelector } from '@reduxjs/toolkit';

export const selectUserChat = createSelector(
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
    messages: chats.find((chat) => chat.id === currentChatId)!.messages,
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

export const selectCurrentMessagesLength = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
  ],
  (chats, currentChatId) =>
    chats.find((chat) => chat.id === currentChatId)?.messages.length
);

export const selectMessages = createSelector(
  [
    (state: RootState) => state.chat.chats,
    (state: RootState) => state.chat.currentChatId,
    (state: RootState) => state.chat.isMessagesInitialLoading,
    (state: RootState) => state.chat.maxMessagesCount,
  ],
  (chats, currentChatId, isMessagesInitialLoading, maxMessagesCount) => ({
    messagesLength: chats.find((chat) => chat.id === currentChatId)!.messages
      .length,
    isMessagesInitialLoading,
    maxMessagesCount,
  })
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
      currentChatUser: currentChat?.users[0],
    };
  }
);
