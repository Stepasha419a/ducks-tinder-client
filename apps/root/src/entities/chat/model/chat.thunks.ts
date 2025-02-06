import type { PaginationParams } from '@ducks-tinder-client/common';
import type { Message } from '@ducks-tinder-client/common';
import {
  returnErrorMessage,
  PAGINATION_TAKE,
} from '@ducks-tinder-client/common';
import { chatService } from '@ducks-tinder-client/common';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCurrentChatData } from '@entities/chat';

export const getChatThunk = createAsyncThunk(
  'chat/getChat',
  async (chatId: string, { rejectWithValue }) => {
    try {
      const response = await chatService.getChat(chatId);

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

      const response = await chatService.getChats(params);

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

      const socketReturn = chatService.connectChat(chatId);

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
      chatService.disconnectChat(chatId);
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const disconnectThunk = createAsyncThunk(
  'chat/disconnect',
  (_, { rejectWithValue }) => {
    try {
      chatService.disconnect();
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

        const response = await chatService.getMessages(activeChat.id, params);
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
      const response = await chatService.getNewMessagesCount();
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
      chatService.deleteMessage(messageId);
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const editMessageThunk = createAsyncThunk(
  'chat/editMessage',
  (args: { messageId: string; text: string }, { rejectWithValue }) => {
    try {
      chatService.editMessage(args.messageId, args.text);
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
        chatService.blockChat(activeChat.id);
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
        chatService.unblockChat(activeChat.id);
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
        chatService.deleteChat(activeChat.id);
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
        chatService.sendMessage(activeChat.id, text, repliedId);
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
        const response = await chatService.getMember(activeChat.memberId);
        return response.data;
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
