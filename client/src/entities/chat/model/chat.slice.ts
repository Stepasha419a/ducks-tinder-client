import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Chat, Message, ShortChat } from '@shared/api/interfaces';
import type { ChatInitialState, GetMessagesResponse } from './chat.interfaces';
import {
  getChatsThunk,
  connectChatThunk,
  closeAllSocketsThunk,
  sendMessageThunk,
} from './chat.thunks';

const initialState: ChatInitialState = {
  chats: [],
  isConnected: false,
  isLoading: true,
  isNotFound: false,
  isMessagesInitialLoading: true,
  isMessagesLoading: false,
  maxMessagesCount: 0,
  isMessagesEnded: false,
  currentChatId: '',
  repliedMessage: null,
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    pushNewMessage: (state, { payload }: PayloadAction<Message>) => {
      const index = state.chats.findIndex(
        (chat) => chat.id === state.currentChatId
      );
      state.chats[index].messages.push(payload);
      state.maxMessagesCount++;
    },
    setCurrentChatData: (state, { payload }: PayloadAction<Chat>) => {
      state.currentChatId = payload.id;

      const index = state.chats.findIndex((chat) => chat.id === payload.id);
      state.chats[index].messages = payload.messages;

      state.isConnected = true;
      state.maxMessagesCount = payload.messagesCount;
      state.isMessagesLoading = false;
      state.isMessagesEnded = false;
      state.repliedMessage = null;
      state.isNotFound = false;
    },
    getMessages: (state, { payload }: PayloadAction<GetMessagesResponse>) => {
      if (payload.messages.length === 0) {
        state.isMessagesEnded = true;
      }
      const index = state.chats.findIndex((chat) => chat.id === payload.chatId);
      state.chats[index].messages = [
        ...payload.messages,
        ...state.chats[index].messages,
      ];
      state.isMessagesLoading = false;
    },
    deleteMessage: (state, { payload }: PayloadAction<Message>) => {
      const index = state.chats.findIndex(
        (chat) => chat.id === state.currentChatId
      );
      state.chats[index].messages = state.chats[index].messages.filter(
        (message) => message.id !== payload.id
      );
      state.maxMessagesCount--;
    },
    editMessage: (state, { payload }: PayloadAction<Message>) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat.id === state.currentChatId
      );
      const messageIndex = state.chats[chatIndex].messages.findIndex(
        (message) => message.id === payload.id
      );
      state.chats[chatIndex].messages[messageIndex] = payload;
    },
    setIsMessagesLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isMessagesLoading = payload;
    },
    setRepliedMessage: (state, { payload }: PayloadAction<Message | null>) => {
      state.repliedMessage = payload;
    },
    setIsNotFound: (state, { payload }: PayloadAction<boolean>) => {
      state.isNotFound = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getChatsThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortChat[]>) => {
          state.chats = payload;
          state.isLoading = false;
        }
      )
      .addCase(connectChatThunk.pending, (state) => {
        state.isMessagesInitialLoading = true;
      })
      .addCase(connectChatThunk.fulfilled, (state) => {
        state.isMessagesInitialLoading = false;
      })
      .addCase(closeAllSocketsThunk.fulfilled, (state) => {
        state.isConnected = false;
        state.maxMessagesCount = 0;
        state.currentChatId = '';
        state.repliedMessage = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state) => {
        if (state.repliedMessage) {
          state.repliedMessage = null;
        }
      });
  },
});

export const {
  pushNewMessage,
  setCurrentChatData,
  getMessages,
  deleteMessage,
  setIsMessagesLoading,
  editMessage,
  setRepliedMessage,
  setIsNotFound,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
