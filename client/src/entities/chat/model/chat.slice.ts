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
  currentMessages: [],
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
      state.currentMessages.push(payload);
    },
    setCurrentChatData: (state, { payload }: PayloadAction<Chat>) => {
      const chat: Chat = payload;
      state.currentChatId = chat.id;
      state.isConnected = true;
      state.currentMessages = chat.messages;
      state.maxMessagesCount = chat.messagesCount;
      state.isMessagesEnded = false;
    },
    getMessages: (state, { payload }: PayloadAction<Message[]>) => {
      if (payload.length === 0) {
        state.isMessagesEnded = true;
      }
      state.currentMessages = [...payload, ...state.currentMessages];
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
        state.currentMessages = [];
        state.maxMessagesCount = 0;
        state.currentChatId = '';
      });
  },
});

export const { pushNewMessage, setCurrentChatData, getMessages } =
  chatSlice.actions;

export const chatReducer = chatSlice.reducer;
