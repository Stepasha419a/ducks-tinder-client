import type { Selector } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import type { Chat, Message } from '@shared/api';

interface SelectMessagesResult {
  messages: Message[];
  isMessagesLoading: boolean;
  isMessagesEnded: boolean;
}

export const selectMessages: Selector<RootState, SelectMessagesResult> =
  createSelector(
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

interface SelectChatListResult {
  chats: Chat[];
  activeChat: Chat | null;
  isLoading: boolean;
}

export const selectChatList: Selector<RootState, SelectChatListResult> =
  createSelector(
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

export const selectCurrentMessagesLength: Selector<RootState, number> =
  createSelector(
    [(state: RootState) => state.chat.messages],
    (messages) => messages.length
  );
