import { createAsyncThunk } from '@reduxjs/toolkit';

import { setCurrentChatData } from '@entities/chat';
import { serviceGetter, type Message } from '@shared/api';
import type { PaginationParams } from '@shared/lib';
import { PAGINATION_TAKE, returnErrorMessage } from '@shared/lib';

export const getChatThunk = createAsyncThunk(
  'chat/getChat',
  async (chatId: string, { rejectWithValue }) => {
    try {
      const response = await serviceGetter.getChatService().getChat(chatId);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const getChatsThunk = createAsyncThunk(
  'chat/getChats',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        chat: { chats },
      } = getState() as RootState;

      const params: PaginationParams = {
        skip: chats.length,
        take: PAGINATION_TAKE,
      };

      const response = await serviceGetter.getChatService().getChats(params);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const connectChatThunk = createAsyncThunk(
  'chat/connectChat',
  (args: { chatId: string }, { rejectWithValue, dispatch }) => {
    try {
      const { chatId } = args;

      const socketReturn = serviceGetter.getChatService().connectChat(chatId);

      socketReturn?.once('connect-chat', () => {
        dispatch(setCurrentChatData(chatId));
      });
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const disconnectChatThunk = createAsyncThunk(
  'chat/disconnectChat',
  (chatId: string, { rejectWithValue }) => {
    try {
      serviceGetter.getChatService().disconnectChat(chatId);
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const disconnectThunk = createAsyncThunk(
  'chat/disconnect',
  (_, { rejectWithValue }) => {
    try {
      serviceGetter.getChatService().disconnect();
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const getMessagesThunk = createAsyncThunk(
  'chat/getMessages',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { chat } = getState() as RootState;
      const { activeChat, messages } = chat;

      if (activeChat?.id) {
        const params: PaginationParams = {
          skip: messages.length,
          take: PAGINATION_TAKE,
        };

        const response = await serviceGetter
          .getChatService()
          .getMessages(activeChat.id, params);
        return response.data;
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const getNewMessagesCountThunk = createAsyncThunk(
  'chat/getNewMessagesCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await serviceGetter
        .getChatService()
        .getNewMessagesCount();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const deleteMessageThunk = createAsyncThunk(
  'chat/deleteMessage',
  (messageId: string, { rejectWithValue }) => {
    try {
      serviceGetter.getChatService().deleteMessage(messageId);
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const editMessageThunk = createAsyncThunk(
  'chat/editMessage',
  (args: { messageId: string; text: string }, { rejectWithValue }) => {
    try {
      serviceGetter.getChatService().editMessage(args.messageId, args.text);
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const blockChatThunk = createAsyncThunk(
  'chat/blockChat',
  (_, { rejectWithValue, getState }) => {
    try {
      const { chat } = getState() as RootState;
      const { activeChat } = chat;

      if (activeChat?.id) {
        serviceGetter.getChatService().blockChat(activeChat.id);
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const unblockChatThunk = createAsyncThunk(
  'chat/unblockChat',
  (_, { rejectWithValue, getState }) => {
    try {
      const { chat } = getState() as RootState;
      const { activeChat } = chat;

      if (activeChat?.id) {
        serviceGetter.getChatService().unblockChat(activeChat.id);
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const deleteChatThunk = createAsyncThunk(
  'chat/deleteChat',
  (_, { rejectWithValue, getState }) => {
    try {
      const { chat } = getState() as RootState;
      const { activeChat } = chat;

      if (activeChat?.id) {
        serviceGetter.getChatService().deleteChat(activeChat.id);
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const sendMessageThunk = createAsyncThunk(
  'chat/sendMessage',
  (
    args: { text: string; repliedMessage: Message | null },
    { rejectWithValue, getState }
  ) => {
    try {
      const { chat } = getState() as RootState;
      const { activeChat } = chat;

      const { text, repliedMessage } = args;

      let repliedId = null;
      if (repliedMessage) {
        repliedId = repliedMessage.id;
      }

      if (activeChat?.id) {
        serviceGetter
          .getChatService()
          .sendMessage(activeChat.id, text, repliedId);
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const getMemberThunk = createAsyncThunk(
  'chat/getMember',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        chat: { activeChat },
      } = getState() as RootState;

      if (activeChat) {
        const response = await serviceGetter
          .getChatService()
          .getMember(activeChat.memberId);
        return response.data;
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
