import { IUser } from '../../models/IUser';
import { createSlice } from '@reduxjs/toolkit';
import { IChat, IMessage } from '../../models/IChat';
import { getChatsThunk } from './chat.thunks';

const chatSlice = createSlice({
  name: 'chatPage',
  initialState: {
    chats: [] as IChat[],
    chatsUsers: [] as IUser[],
    isConnected: false,
    currentMessages: [] as IMessage[],
    currentChatId: '',
    currentChatMembers: [] as IUser[],
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    pushMessage: (state, action) => {
      state.chats[action.payload.chatIndex].messages = [
        ...state.chats[action.payload.chatIndex].messages,
        action.payload.message,
      ];
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setCurrentMessages: (state, action) => {
      if (action.payload.length === 0) {
        state.currentMessages = [];
      } else if (Array.isArray(action.payload)) {
        state.currentMessages = [...state.currentMessages, ...action.payload];
      } else {
        state.currentMessages = [...state.currentMessages, action.payload];
      }
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setCurrentChatMembers: (state, action) => {
      let chat = action.payload;
      let members = state.chatsUsers.filter(
        (user) => user._id === chat?.members[0] || user._id === chat?.members[1]
      );

      state.currentChatMembers = members;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatsThunk.fulfilled, (state, { payload }) => {
      if (payload) {
        state.chats = [...payload.chats];
        state.chatsUsers = [...payload.allMembers];
      }
    });
  },
});

const initialState = chatSlice.getInitialState();
export type ChatSliceInitialStateType = typeof initialState;

export const {
  setChats,
  pushMessage,
  setIsConnected,
  setCurrentMessages,
  setCurrentChatId,
  setCurrentChatMembers,
} = chatSlice.actions;

export default chatSlice.reducer;
