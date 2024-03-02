import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  PaginationParams,
  WsExceptionError,
} from '@shared/lib/interfaces';
import { chatService } from '@shared/api/services';
import { returnErrorMessage } from '@shared/helpers';
import { pushNewMessage, setCurrentChatData } from '@entities/chat/model';
import type { ReceivedChatBlock, ReceivedMessage } from './chat.interfaces';
import {
  blockChat,
  deleteChat,
  deleteMessage,
  editMessage,
  setIsMessagesLoading,
  setIsNotFound,
  setMessages,
  unblockChat,
} from './chat.slice';
import { checkAuthThunk } from '@entities/auth/model';

export const getChatsThunk = createAsyncThunk(
  'chat/getChats',
  async (_, { rejectWithValue }) => {
    try {
      const { data: chats } = await chatService.getChats();

      return chats;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const connectChatsThunk = createAsyncThunk(
  'chat/connectChats',
  (_, { rejectWithValue, dispatch }) => {
    try {
      const socket = chatService.connect();

      socket.onAny((event: string, ...errors: unknown[]) => {
        if (event === 'exception' && (errors[0] as WsExceptionError).message) {
          switch ((errors[0] as WsExceptionError).message) {
            case 'Unauthorized':
              dispatch(checkAuthThunk());
              break;
            case 'Not Found':
              dispatch(setIsNotFound(true));
              break;
            default:
              break;
          }
        }
      });

      socket.on('send-message', (data: ReceivedMessage) => {
        dispatch(pushNewMessage(data));
      });

      socket.on('edit-message', (data: ReceivedMessage) => {
        dispatch(editMessage(data));
      });

      socket.on('delete-message', (data: ReceivedMessage) => {
        dispatch(deleteMessage(data));
      });

      socket.on('block-chat', (data: ReceivedChatBlock) => {
        dispatch(blockChat(data));
      });

      socket.on('unblock-chat', (data: ReceivedChatBlock) => {
        dispatch(unblockChat(data));
      });

      socket.on('delete-chat', (deletedChatId: string) => {
        dispatch(deleteChat(deletedChatId));
      });
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

      const socket = chatService.connectChat(chatId);

      socket.once('connect-chat', () => {
        dispatch(setCurrentChatData(chatId));
      });
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const disconnectChatThunk = createAsyncThunk(
  'chat/disconnectChat',
  (_, { rejectWithValue, getState }) => {
    try {
      const { chat } = getState() as RootState;
      const { currentChatId } = chat;

      if (currentChatId) {
        chatService.disconnectChat(currentChatId);
      }
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
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { chat } = getState() as RootState;
      const { currentChatId, isMessagesLoading, messages } = chat;

      if (!isMessagesLoading && currentChatId) {
        const params: PaginationParams = {
          skip: messages.length,
          take: 20,
        };

        dispatch(setIsMessagesLoading(true));

        const response = await chatService.getMessages(currentChatId, params);
        dispatch(setMessages(response.data));
      }
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
      const { currentChatId } = chat;

      if (currentChatId) {
        chatService.blockChat(currentChatId);
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
      const { currentChatId } = chat;

      if (currentChatId) {
        chatService.unblockChat(currentChatId);
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
      const { currentChatId } = chat;

      if (currentChatId) {
        chatService.deleteChat(currentChatId);
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const sendMessageThunk = createAsyncThunk(
  'chat/sendMessage',
  (text: string, { rejectWithValue, getState }) => {
    try {
      const { chat } = getState() as RootState;
      const { repliedMessage, currentChatId } = chat;

      let repliedId = null;
      if (repliedMessage) {
        repliedId = repliedMessage.id;
      }

      if (currentChatId) {
        chatService.sendMessage(currentChatId, text, repliedId);
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
