import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Chat, Message } from '@shared/api/interfaces';
import type {
  ReceivedChatBlock,
  ChatInitialState,
  ReceivedMessage,
} from './chat.interfaces';
import {
  getChatsThunk,
  connectChatThunk,
  disconnectChatThunk,
  connectChatsThunk,
  deleteMessageThunk,
  getMessagesThunk,
} from './chat.thunks';
import { toast } from 'react-toastify';
import type { ShortMessagesPagination } from '@/shared/api/services/chat/chat-service.interface';
import { PAGINATION_TAKE } from '@/shared/lib/constants';

const initialState: ChatInitialState = {
  chats: [],
  messages: [],
  isSocketConnected: false,
  isChatConnected: false,
  isLoading: true,
  isNotFound: false,
  isMessagesInitialLoading: true,
  isMessagesLoading: false,
  isMessagesEnded: false,
  currentChatId: null,
  isChatUserPopup: false,
  currentMessage: null,
  isMessageEditing: false,
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setCurrentChatData: (state, { payload }: PayloadAction<string>) => {
      state.currentChatId = payload;
      state.messages = [];
      state.isChatConnected = true;
      state.isMessagesInitialLoading = true;
      state.isMessagesEnded = false;
      state.isNotFound = false;
    },
    pushNewMessage: (state, { payload }: PayloadAction<ReceivedMessage>) => {
      const { chatId, ...message } = payload;
      const chat = state.chats.find((item) => item.id === chatId);
      if (!chat) {
        return;
      }

      chat.lastMessage = message;

      const isActiveChat = state.currentChatId === chatId;
      if (isActiveChat) {
        const chatVisit = chat.chatVisit;
        if (chatVisit) {
          chatVisit.lastSeen = message.createdAt;
        }
        state.messages.push(message);
      } else {
        const messageText =
          message.text.length > 20
            ? `${message.text.slice(0, 20)}...`
            : message.text;
        toast(`${chat.name}: ${messageText}`);
      }
    },
    deleteMessage: (state, { payload }: PayloadAction<ReceivedMessage>) => {
      const { chatId, ...message } = payload;
      const isActive = chatId === state.currentChatId;
      if (!isActive) {
        return;
      }

      state.messages = state.messages.filter((item) => item.id !== message.id);
    },
    editMessage: (state, { payload }: PayloadAction<ReceivedMessage>) => {
      const { chatId, ...message } = payload;

      const activeChat = state.chats.find((chat) => chat.id === chatId);
      if (!activeChat) {
        return;
      }

      const foundMessage = state.messages.find(
        (item) => item.id === message.id
      );
      if (foundMessage) {
        foundMessage.text = message.text;
        foundMessage.updatedAt = message.updatedAt;

        if (activeChat.lastMessage?.id === foundMessage.id) {
          activeChat.lastMessage = foundMessage;
        }
      }
    },
    blockChat: (state, { payload }: PayloadAction<ReceivedChatBlock>) => {
      const chat = state.chats.find((item) => item.id === payload.id);
      if (!chat) {
        return;
      }

      chat.blocked = payload.blocked;
      chat.blockedById = payload.blockedById;
    },
    unblockChat: (state, { payload }: PayloadAction<ReceivedChatBlock>) => {
      const chat = state.chats.find((item) => item.id === payload.id);
      if (!chat) {
        return;
      }

      chat.blocked = payload.blocked;
      chat.blockedById = payload.blockedById;
    },
    deleteChat: (state, { payload }: PayloadAction<string>) => {
      state.chats = state.chats.filter((chat) => chat.id !== payload);
      state.isChatConnected = false;
      state.messages = [];
      state.currentChatId = '';
    },
    setIsMessagesLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isMessagesLoading = payload;
    },
    setIsNotFound: (state, { payload }: PayloadAction<boolean>) => {
      state.isNotFound = payload;
    },
    setIsChatUserPopup: (state, { payload }: PayloadAction<boolean>) => {
      state.isChatUserPopup = payload;
    },
    setCurrentMessage: (state, { payload }: PayloadAction<Message | null>) => {
      state.currentMessage = payload;
    },
    setIsMessageEditing: (state, { payload }: PayloadAction<boolean>) => {
      state.isMessageEditing = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getChatsThunk.fulfilled,
        (state, { payload }: PayloadAction<Chat[]>) => {
          state.chats = payload;
          state.isLoading = false;
        }
      )
      .addCase(connectChatsThunk.fulfilled, (state) => {
        state.isSocketConnected = true;
      })
      .addCase(connectChatThunk.pending, (state) => {
        state.isMessagesInitialLoading = true;

        const wasConnectedBefore = state.currentChatId;
        if (wasConnectedBefore) {
          const chat = state.chats.find(
            (item) => item.id === state.currentChatId
          );
          if (!chat || !chat.chatVisit) {
            return;
          }

          chat.chatVisit.lastSeen = new Date().toISOString();
        }
      })
      .addCase(connectChatThunk.fulfilled, (state) => {
        state.isMessagesInitialLoading = false;
      })
      .addCase(
        getMessagesThunk.fulfilled,
        (
          state,
          { payload }: PayloadAction<ShortMessagesPagination | undefined>
        ) => {
          state.isMessagesLoading = false;
          if (!payload) {
            return;
          }

          if (state.isMessagesInitialLoading) {
            state.isMessagesInitialLoading = false;
          }
          if (payload.messages.length < PAGINATION_TAKE) {
            state.isMessagesEnded = true;
            if (payload.messages.length === 0) {
              return;
            }
          }

          const isActive = payload.chatId === state.currentChatId;
          if (!isActive) {
            return;
          }

          state.messages = payload.messages.reverse().concat(state.messages);
        }
      )
      .addCase(disconnectChatThunk.fulfilled, (state) => {
        if (state.currentChatId) {
          const chat = state.chats.find(
            (item) => item.id === state.currentChatId
          );
          if (chat && chat.chatVisit) {
            chat.chatVisit.lastSeen = new Date().toISOString();
          }
        }

        state.isChatConnected = false;
        state.messages = [];
        state.currentChatId = '';
      })
      .addCase(deleteMessageThunk.pending, (state) => {
        state.currentMessage = null;
      });
  },
});

export const {
  pushNewMessage,
  setCurrentChatData,
  deleteMessage,
  setIsMessagesLoading,
  editMessage,
  blockChat,
  unblockChat,
  deleteChat,
  setIsNotFound,
  setIsChatUserPopup,
  setCurrentMessage,
  setIsMessageEditing,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
