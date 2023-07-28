import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Chat, Message, ShortChat } from '@shared/api/interfaces';
import type {
  ChatBlockResponse,
  ChatInitialState,
  ChatUnblockResponse,
  GetMessagesResponse,
  ReceivedMessage,
} from './chat.interfaces';
import {
  getChatsThunk,
  connectChatThunk,
  sendMessageThunk,
  disconnectChatThunk,
} from './chat.thunks';
import { toast } from 'react-toastify';

const initialState: ChatInitialState = {
  chats: [],
  isConnected: false,
  isLoading: true,
  isNotFound: false,
  isMessagesInitialLoading: true,
  isMessagesLoading: false,
  maxMessagesCount: 0,
  isMessagesEnded: false,
  currentChatId: null,
  repliedMessage: null,
  isChatUserPopup: false,
  currentMessage: null,
  isMessageEditing: false,
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    pushNewMessage: (state, { payload }: PayloadAction<ReceivedMessage>) => {
      const index = state.chats.findIndex((chat) => chat.id === payload.chatId);
      state.chats[index].messages.push(payload.message);

      const isActiveChat = state.currentChatId === payload.chatId;
      if (isActiveChat) {
        state.chats[index].chatVisits[0].lastSeen = payload.message.createdAt;
        state.maxMessagesCount++;
      } else {
        const nickname = state.chats[index].users[0].name;
        const messageText =
          payload.message.text.length > 20
            ? `${payload.message.text.slice(0, 20)}...`
            : payload.message.text;
        toast(`${nickname}: ${messageText}`);
      }
    },
    setCurrentChatData: (state, { payload }: PayloadAction<Chat>) => {
      state.currentChatId = payload.id;

      const index = state.chats.findIndex((chat) => chat.id === payload.id);
      state.chats[index].chatVisits[0].lastSeen = new Date().toISOString();
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
    deleteMessage: (state, { payload }: PayloadAction<ReceivedMessage>) => {
      const index = state.chats.findIndex((chat) => chat.id === payload.chatId);
      state.chats[index].messages = state.chats[index].messages.filter(
        (message) => message.id !== payload.message.id
      );
      state.maxMessagesCount--;
    },
    editMessage: (state, { payload }: PayloadAction<ReceivedMessage>) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat.id === payload.chatId
      );
      const messageIndex = state.chats[chatIndex].messages.findIndex(
        (message) => message.id === payload.message.id
      );
      state.chats[chatIndex].messages[messageIndex] = payload.message;
    },
    blockChat: (state, { payload }: PayloadAction<ChatBlockResponse>) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat.id === payload.chatId
      );
      state.chats[chatIndex].blocked = payload.blocked;
      state.chats[chatIndex].blockedById = payload.blockedById;
    },
    unblockChat: (state, { payload }: PayloadAction<ChatUnblockResponse>) => {
      state.chats[
        state.chats.findIndex((chat) => chat.id === payload.chatId)
      ].blocked = payload.blocked;
    },
    deleteChat: (state, { payload }: PayloadAction<string>) => {
      state.chats = state.chats.filter((chat) => chat.id !== payload);
      state.isConnected = false;
      state.maxMessagesCount = 0;
      state.currentChatId = '';
      state.repliedMessage = null;
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
        (state, { payload }: PayloadAction<ShortChat[]>) => {
          state.chats = payload;
          state.isLoading = false;
        }
      )
      .addCase(connectChatThunk.pending, (state) => {
        state.isMessagesInitialLoading = true;

        const wasConnectedBefore = state.currentChatId;
        if (wasConnectedBefore) {
          const index = state.chats.findIndex(
            (chat) => chat.id === state.currentChatId
          );
          state.chats[index].chatVisits[0].lastSeen = new Date().toISOString();
        }
      })
      .addCase(connectChatThunk.fulfilled, (state) => {
        state.isMessagesInitialLoading = false;
      })
      .addCase(disconnectChatThunk.fulfilled, (state) => {
        const index = state.chats.findIndex(
          (chat) => chat.id === state.currentChatId
        );
        state.chats[index].chatVisits[0].lastSeen = new Date().toISOString();

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
  blockChat,
  unblockChat,
  deleteChat,
  setRepliedMessage,
  setIsNotFound,
  setIsChatUserPopup,
  setCurrentMessage,
  setIsMessageEditing,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
