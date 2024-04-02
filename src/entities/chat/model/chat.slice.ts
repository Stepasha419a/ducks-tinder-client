import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Chat, ShortUser } from '@shared/api/interfaces';
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
  getMessagesThunk,
  getMemberThunk,
} from './chat.thunks';
import { toast } from 'react-toastify';
import type { ShortMessagesPagination } from '@/shared/api/services/chat/chat-service.interface';
import { PAGINATION_TAKE } from '@/shared/lib/constants';

const initialState: ChatInitialState = {
  chats: [],
  messages: [],
  isSocketConnected: false,
  isLoading: true,
  isEnded: false,
  isNotFound: false,
  isMessagesLoading: false,
  isMessagesEnded: false,
  currentChatId: null,
  chatMember: null,
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setCurrentChatData: (state, { payload }: PayloadAction<string>) => {
      state.currentChatId = payload;
      state.messages = [];
      state.isMessagesEnded = false;
      state.isNotFound = false;
    },
    pushNewMessage: (state, { payload }: PayloadAction<ReceivedMessage>) => {
      const { chatId, ...message } = payload;

      const existingChatIndex = state.chats.findIndex(
        (item) => item.id === chatId
      );
      if (existingChatIndex !== -1) {
        state.chats.unshift(state.chats.splice(existingChatIndex, 1)[0]);

        state.chats[0].lastMessage = message;
      } else {
        state.chats.unshift({
          avatar: message.avatar,
          id: chatId,
          name: message.name,
          memberId: message.userId,
          lastMessage: message,
        } as unknown as Chat);
      }

      const isActiveChat = state.currentChatId === chatId;
      if (isActiveChat) {
        /* const chatVisit = chat.chatVisit;
        if (chatVisit) {
          chatVisit.lastSeen = message.createdAt;
        } */
        state.messages.push(message);
      } else {
        const messageText =
          message.text.length > 20
            ? `${message.text.slice(0, 20)}...`
            : message.text;
        toast(`${message.name}: ${messageText}`);
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
      state.messages = [];
      state.currentChatId = '';
    },
    setIsNotFound: (state, { payload }: PayloadAction<boolean>) => {
      state.isNotFound = payload;
    },
    nullMember: (state) => {
      state.chatMember = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getChatsThunk.fulfilled,
        (state, { payload }: PayloadAction<Chat[] | undefined>) => {
          state.isLoading = false;
          if (!payload) {
            return;
          }

          if (payload.length < PAGINATION_TAKE) {
            state.isEnded = true;
            if (payload.length === 0) {
              return;
            }
          }

          state.chats = state.chats.concat(payload);
        }
      )
      .addCase(connectChatsThunk.fulfilled, (state) => {
        state.isSocketConnected = true;
      })
      .addCase(connectChatThunk.pending, (state) => {
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
      .addCase(getMessagesThunk.pending, (state) => {
        state.isMessagesLoading = true;
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

        state.messages = [];
        state.currentChatId = '';
      })
      .addCase(
        getMemberThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUser | undefined>) => {
          if (payload) {
            state.chatMember = payload;
          }
        }
      );
  },
});

export const {
  pushNewMessage,
  setCurrentChatData,
  deleteMessage,
  editMessage,
  blockChat,
  unblockChat,
  deleteChat,
  setIsNotFound,
  nullMember,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
