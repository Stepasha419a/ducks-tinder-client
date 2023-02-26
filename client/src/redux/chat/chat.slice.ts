import { IUser } from '../../models/IUser';
import { createSlice } from '@reduxjs/toolkit';
import { IChat, IMessage } from '../../models/IChat';
import { getChatsThunk } from './chat.thunks';

export interface InitialState {
  chats: IChat[];
  chatsUsers: IUser[];
  isConnected: boolean;
  currentMessages: IMessage[];
  currentChatId: string;
  currentChatMembers: IUser[];
}

const initialState: InitialState = {
  chats: [],
  chatsUsers: [],
  isConnected: false,
  currentMessages: [],
  currentChatId: '',
  currentChatMembers: [],
};

const chatSlice = createSlice({
  name: 'chatPage',
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    pushMessage: (state, action) => {
      state.chats[action.payload.chatIndex].messages.push(
        action.payload.message
      );
    },
    pushNewMessage: (state, action) => {
      state.currentMessages.push(action.payload);
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setCurrentMessages: (state, action) => {
      if (action.payload.length === 0) {
        state.currentMessages = [];
      } else {
        state.currentMessages = state.currentMessages.concat(action.payload);
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

export const {
  setChats,
  pushMessage,
  pushNewMessage,
  setIsConnected,
  setCurrentMessages,
  setCurrentChatId,
  setCurrentChatMembers,
} = chatSlice.actions;

export default chatSlice.reducer;
