import type { Selector } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import type { Chat, Message } from '@shared/api';

interface SelectMessagesResult {
  messages: Message[];
  isMessagesLoading: boolean;
  isMessagesEnded: boolean;
}

export const selectMessages: Selector<ChatState, SelectMessagesResult> =
  createSelector(
    [
      (state: ChatState) => state.chat.messages,
      (state: ChatState) => state.chat.isMessagesLoading,
      (state: ChatState) => state.chat.isMessagesEnded,
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

export const selectChatList: Selector<ChatState, SelectChatListResult> =
  createSelector(
    [
      (state: ChatState) => state.chat.chats,
      (state: ChatState) => state.chat.activeChat,
      (state: ChatState) => state.chat.isLoading,
    ],
    (chats, activeChat, isLoading) => ({
      chats,
      activeChat,
      isLoading,
    })
  );

export const selectCurrentMessagesLength: Selector<ChatState, number> =
  createSelector(
    [(state: ChatState) => state.chat.messages],
    (messages) => messages.length
  );
