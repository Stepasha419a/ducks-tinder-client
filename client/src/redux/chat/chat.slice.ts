import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Chat, Message } from '@shared/api/interfaces';
import type { ChatInitialState, GetChatsThunkPayload } from './chat.interfaces';
import {
  getChatsThunk,
  connectChatThunk,
  closeAllSockets,
} from './chat.thunks';

const initialState: ChatInitialState = {
  chats: [],
  chatsUsers: [],
  isConnected: false,
  isLoading: false,
  currentMessages: [],
  currentChatId: '',
  currentChatMembers: [],
};

const chatSlice = createSlice({
  name: 'chatPage',
  initialState,
  reducers: {
    pushNewMessage: (state, { payload }: PayloadAction<Message>) => {
      const index = state.chats.findIndex(
        (chat) => chat._id === state.currentChatId
      );
      state.chats[index].messages.push(payload);
      state.currentMessages.push(payload);
    },
    setCurrentChatData: (state, { payload }: PayloadAction<Chat>) => {
      const chat: Chat = payload;
      state.currentChatId = chat._id;
      state.isConnected = true;
      state.currentChatMembers = state.chatsUsers.filter(
        (user) => user._id === chat.members[0] || user._id === chat.members[1]
      );
      state.currentMessages = chat.messages;
      state.isLoading = false;
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
        (state, { payload }: PayloadAction<GetChatsThunkPayload>) => {
          state.chats = [...payload.chats];
          state.chatsUsers = [...payload.allMembers];
        }
      )
      .addCase(connectChatThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(closeAllSockets.fulfilled, (state) => {
        state.isConnected = false;
        state.currentMessages = [];
        state.currentChatId = '';
      });
  },
});

export const { pushNewMessage, setCurrentChatData, disconnectChat } =
  chatSlice.actions;

export default chatSlice.reducer;
