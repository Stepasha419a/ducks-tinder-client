import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Chat, Message } from '@shared/api/interfaces';
import type {
  ReceivedChatBlock,
  ChatInitialState,
  ReceivedMessage,
} from './chat.interfaces';
import {
  getChatsThunk,
  connectChatThunk,
  sendMessageThunk,
  disconnectChatThunk,
  connectChatsThunk,
  deleteMessageThunk,
} from './chat.thunks';
import { toast } from 'react-toastify';
import type { ShortMessagesPagination } from '@/shared/api/services/chat/chat-service.interface';

const initialState: ChatInitialState = {
  chats: [],
  messagesPagination: null,
  isSocketConnected: false,
  isChatConnected: false,
  isLoading: true,
  isNotFound: false,
  isMessagesInitialLoading: true,
  isMessagesLoading: false,
  skipMessagesCount: 0,
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
      const { chatId, ...message } = payload;
      const chat = state.chats.find((item) => item.id === chatId);
      if (!chat) {
        return;
      }

      chat.lastMessage = message;

      const isActiveChat = state.currentChatId === chatId;
      if (isActiveChat) {
        const chatVisit = chat.chatVisit;
        if (chatVisit) {
          chatVisit.lastSeen = message.createdAt;
        }
        state.skipMessagesCount++;
      } else {
        const messageText =
          message.text.length > 20
            ? `${message.text.slice(0, 20)}...`
            : message.text;
        toast(`${chat.name}: ${messageText}`);
      }
    },
    getMessages: (
      state,
      { payload }: PayloadAction<ShortMessagesPagination>
    ) => {
      if (payload.messages.length === 0) {
        state.isMessagesEnded = true;
        return;
      }

      const isActive = payload.chatId === state.messagesPagination?.chatId;
      if (!isActive) {
        return;
      }
      const messagesPagination = state.messagesPagination!;

      messagesPagination.messages = payload.messages.concat(
        messagesPagination.messages
      );
      payload.users.forEach((user) => {
        if (!messagesPagination.users.find((item) => item.id === user.id)) {
          messagesPagination.users.push(user);
        }
      });
      state.isMessagesLoading = false;
    },
    deleteMessage: (state, { payload }: PayloadAction<ReceivedMessage>) => {
      const { chatId, ...message } = payload;
      const isActive = chatId === state.messagesPagination?.chatId;
      if (!isActive) {
        return;
      }
      const messagesPagination = state.messagesPagination!;

      messagesPagination.messages = messagesPagination.messages.filter(
        (item) => item.id !== message.id
      );
      state.skipMessagesCount--;
    },
    editMessage: (state, { payload }: PayloadAction<ReceivedMessage>) => {
      const { chatId, ...message } = payload;

      const isActive = chatId === state.messagesPagination?.chatId;
      if (!isActive) {
        return;
      }
      const messagesPagination = state.messagesPagination!;

      const foundMessage = messagesPagination.messages.find(
        (item) => item.id === message.id
      );
      if (foundMessage) {
        foundMessage.text = message.text;
        foundMessage.updatedAt = message.updatedAt;
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
      state.isChatConnected = false;
      state.skipMessagesCount = 0;
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
        (state, { payload }: PayloadAction<Chat[]>) => {
          state.chats = payload;
          state.isLoading = false;
        }
      )
      .addCase(connectChatsThunk.fulfilled, (state) => {
        state.isSocketConnected = true;
      })
      .addCase(connectChatThunk.pending, (state) => {
        state.isMessagesInitialLoading = true;

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
      .addCase(connectChatThunk.fulfilled, (state) => {
        state.isMessagesInitialLoading = false;
      })
      .addCase(disconnectChatThunk.fulfilled, (state) => {
        if (state.currentChatId) {
          const chat = state.chats.find(
            (item) => item.id === state.currentChatId
          );
          if (chat && chat.chatVisit) {
            chat.chatVisit.lastSeen = new Date().toISOString();
          }
        }

        state.isChatConnected = false;
        state.skipMessagesCount = 0;
        state.currentChatId = '';
        state.repliedMessage = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state) => {
        if (state.repliedMessage) {
          state.repliedMessage = null;
        }
      })
      .addCase(deleteMessageThunk.pending, (state) => {
        state.currentMessage = null;
      });
  },
});

export const {
  pushNewMessage,
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
