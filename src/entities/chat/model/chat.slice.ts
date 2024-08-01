import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import type {
  Chat,
  ReceivedChatBlock,
  ReceivedMessage,
  ShortUser,
} from '@shared/api';
import type { ShortMessagesPagination } from '@shared/api';
import { PAGINATION_TAKE } from '@shared/lib';
import type { ChatInitialState, PushNewMessage } from './chat.interfaces';
import {
  getChatsThunk,
  disconnectChatThunk,
  getMessagesThunk,
  getMemberThunk,
  getNewMessagesCountThunk,
  getChatThunk,
} from './chat.thunks';

const initialState: ChatInitialState = {
  activeChat: null,
  isChatLoading: false,
  chats: [],
  messages: [],
  newMessagesCount: null,
  isSocketConnected: false,
  isLoading: false,
  isEnded: false,
  isFetched: false,
  isNotFound: false,
  isMessagesLoading: false,
  isMessagesEnded: false,
  chatMember: null,
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setConnectedSocket: (state) => {
      state.isSocketConnected = true;
    },
    setCurrentChatData: (state, { payload }: PayloadAction<string>) => {
      state.messages = [];
      state.isMessagesEnded = false;
      state.isNotFound = false;

      const chat = state.chats.find((item) => item.id === payload);
      if (chat?.newMessagesCount) {
        chat.newMessagesCount = 0;
        if (state.newMessagesCount) {
          state.newMessagesCount--;
        }
      }
    },
    pushNewMessage: (state, { payload }: PayloadAction<PushNewMessage>) => {
      const {
        message: { chatId, ...message },
        newMessagesCount,
        currentUserId,
      } = payload;

      const existingChatIndex = state.chats.findIndex(
        (item) => item.id === chatId
      );
      if (existingChatIndex !== -1) {
        state.chats.unshift(state.chats.splice(existingChatIndex, 1)[0]);

        state.chats[0].lastMessage = message;
        state.chats[0].newMessagesCount = newMessagesCount;
      } else {
        const isOwnMessage = currentUserId === message.userId;

        if (!isOwnMessage) {
          state.chats.unshift({
            avatar: message.avatar,
            id: chatId,
            name: message.name,
            memberId: message.userId,
            lastMessage: message,
            newMessagesCount,
          } as Chat);
        } else if (state.activeChat) {
          state.chats.unshift(state.activeChat);
        }
      }

      const isActiveChat = state.activeChat?.id === chatId;
      const isFirstChat = state.chats[0].id === chatId;
      if (isActiveChat && isFirstChat) {
        state.chats[0].lastSeenAt = message.createdAt;
        state.messages.push(message);

        state.chats[0].newMessagesCount = 0;
      } else {
        const messageText =
          message.text.length > 20
            ? `${message.text.slice(0, 20)}...`
            : message.text;
        toast(`${message.name}: ${messageText}`);

        if (newMessagesCount === 1 && state.newMessagesCount !== null) {
          state.newMessagesCount++;
        }
      }
    },
    deleteMessage: (state, { payload }: PayloadAction<ReceivedMessage>) => {
      const { chatId, ...message } = payload;
      const isActive = chatId === state.activeChat?.id;
      if (!isActive) {
        return;
      }

      state.messages = state.messages.filter((item) => item.id !== message.id);
    },
    editMessage: (state, { payload }: PayloadAction<ReceivedMessage>) => {
      const { chatId, ...message } = payload;

      const isActive = chatId === state.activeChat?.id;
      if (!isActive) {
        return;
      }

      const foundMessage = state.messages.find(
        (item) => item.id === message.id
      );
      if (foundMessage) {
        foundMessage.text = message.text;
        foundMessage.updatedAt = message.updatedAt;

        const activeChat = state.chats.find((chat) => chat.id === chatId);
        if (activeChat && activeChat.lastMessage?.id === foundMessage.id) {
          activeChat.lastMessage = foundMessage;
        }
      }
    },
    blockChat: (state, { payload }: PayloadAction<ReceivedChatBlock>) => {
      const isActive = state.activeChat?.id === payload.id;
      if (!state.activeChat || !isActive) {
        return;
      }

      state.activeChat.blocked = payload.blocked;
      state.activeChat.blockedById = payload.blockedById;
    },
    unblockChat: (state, { payload }: PayloadAction<ReceivedChatBlock>) => {
      const isActive = state.activeChat?.id === payload.id;
      if (!state.activeChat || !isActive) {
        return;
      }

      state.activeChat.blocked = payload.blocked;
      state.activeChat.blockedById = payload.blockedById;
    },
    deleteChat: (state, { payload }: PayloadAction<string>) => {
      state.chats = state.chats.filter((chat) => chat.id !== payload);
      state.messages = [];
      state.activeChat = null;
    },
    setIsNotFound: (state, { payload }: PayloadAction<boolean>) => {
      state.isNotFound = payload;
    },
    nullMember: (state) => {
      state.chatMember = null;
    },
    resetChatSlice: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatThunk.pending, (state) => {
        state.isChatLoading = true;
      })
      .addCase(
        getChatThunk.fulfilled,
        (state, { payload }: PayloadAction<Chat>) => {
          state.activeChat = payload;
          state.isChatLoading = false;

          if (
            payload.newMessagesCount &&
            state.newMessagesCount &&
            state.newMessagesCount > 0
          ) {
            state.newMessagesCount--;
          }
        }
      )
      .addCase(getChatsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getChatsThunk.fulfilled,
        (state, { payload }: PayloadAction<Chat[] | undefined>) => {
          state.isLoading = false;
          state.isFetched = true;
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

          const isActive = payload.chatId === state.activeChat?.id;
          if (!isActive) {
            return;
          }

          state.messages = payload.messages.reverse().concat(state.messages);
        }
      )
      .addCase(
        getNewMessagesCountThunk.fulfilled,
        (state, { payload }: PayloadAction<number>) => {
          state.newMessagesCount = payload;
        }
      )
      .addCase(disconnectChatThunk.fulfilled, (state) => {
        if (state.activeChat) {
          const chat = state.chats.find(
            (item) => item.id === state.activeChat!.id
          );
          if (chat) {
            chat.lastSeenAt = new Date().toISOString();
            chat.newMessagesCount = 0;
          }
        }

        state.messages = [];
        state.activeChat = null;
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
  setConnectedSocket,
  pushNewMessage,
  setCurrentChatData,
  deleteMessage,
  editMessage,
  blockChat,
  unblockChat,
  deleteChat,
  setIsNotFound,
  nullMember,
  resetChatSlice,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
