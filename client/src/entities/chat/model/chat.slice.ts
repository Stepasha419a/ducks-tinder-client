import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Chat, Message, ShortChat } from '@shared/api/interfaces';
import type { ChatInitialState } from './chat.interfaces';
import {
  getChatsThunk,
  connectChatThunk,
  closeAllSocketsThunk,
} from './chat.thunks';

const initialState: ChatInitialState = {
  chats: [],
  isConnected: false,
  isLoading: true,
  isMessagesInitialLoading: true,
  isMessagesLoading: false,
  maxMessagesCount: 0,
  isMessagesEnded: false,
  currentChatId: '',
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
    },
    getMessages: (state, { payload }: PayloadAction<Message[]>) => {
      if (payload.length === 0) {
        state.isMessagesEnded = true;
      }
      const index = state.chats.findIndex(
        (chat) => chat.id === state.currentChatId
      );
      state.chats[index].messages = [
        ...payload,
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
    setIsMessagesLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isMessagesLoading = payload;
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
      });
  },
});

export const {
  pushNewMessage,
  setCurrentChatData,
  getMessages,
  deleteMessage,
  setIsMessagesLoading,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
