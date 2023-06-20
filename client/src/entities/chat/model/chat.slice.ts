import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Chat, Message, ShortChat } from '@shared/api/interfaces';
import type { ChatInitialState } from './chat.interfaces';
import { getChatsThunk, connectChatThunk } from './chat.thunks';

const initialState: ChatInitialState = {
  chats: [],
  isConnected: false,
  isLoading: true,
  isMessagesLoading: true,
  currentMessages: [],
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
    },
    disconnectChat: (state) => {
      state.isConnected = false;
      state.currentMessages = [];
      state.currentChatId = '';
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
        state.isMessagesLoading = true;
      })
      .addCase(connectChatThunk.fulfilled, (state) => {
        state.isMessagesLoading = false;
      });
  },
});

export const { pushNewMessage, setCurrentChatData, disconnectChat } =
  chatSlice.actions;

export const chatReducer = chatSlice.reducer;
