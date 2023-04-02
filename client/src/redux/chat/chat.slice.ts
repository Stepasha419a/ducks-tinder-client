import { createSlice } from '@reduxjs/toolkit';
import { Chat, Message, User } from '../../shared/api/interfaces';
import {
  getChatsThunk,
  connectChatThunk,
  closeAllSockets,
} from './chat.thunks';

export interface InitialState {
  chats: Chat[];
  chatsUsers: User[];
  isConnected: boolean;
  isLoading: boolean;
  currentMessages: Message[];
  currentChatId: string;
  currentChatMembers: User[];
}

const initialState: InitialState = {
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
    pushNewMessage: (state, action) => {
      const index = state.chats.findIndex(
        (chat) => chat._id === state.currentChatId
      );
      state.chats[index].messages.push(action.payload);
      state.currentMessages.push(action.payload);
    },
    setCurrentChatData: (state, { payload }) => {
      const chat: Chat = payload;
      state.currentChatId = chat._id;
      state.isConnected = true;
      state.currentChatMembers = state.chatsUsers.filter(
        (user) => user._id === chat?.members[0] || user._id === chat?.members[1]
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
      .addCase(getChatsThunk.fulfilled, (state, { payload }) => {
        if (payload) {
          state.chats = [...payload.chats];
          state.chatsUsers = [...payload.allMembers];
        }
      })
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
