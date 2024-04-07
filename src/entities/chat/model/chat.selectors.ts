import { getDatesHourDiff } from '@/shared/lib/helpers';
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
      const isNewMessage =
        isCompanion &&
        !isActive &&
        Boolean(chat.lastMessage?.createdAt) &&
        Boolean(chat.lastSeenAt) &&
        getDatesHourDiff(
          new Date(chat.lastMessage!.createdAt),
          new Date(new Date(chat.lastSeenAt).toUTCString())
        ) > 0;
      return isNewMessage ? total + 1 : total;
    }, 0)
);
