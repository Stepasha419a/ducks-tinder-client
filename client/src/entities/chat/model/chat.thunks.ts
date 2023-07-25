import type { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatService } from '@shared/api/services';
import { returnErrorMessage } from '@shared/helpers';
import { pushNewMessage, setCurrentChatData } from '@entities/chat/model';
import type {
  ChatBlockResponse,
  ChatUnblockResponse,
  GetMessagesResponse,
  ReceivedMessage,
} from './chat.interfaces';
import {
  blockChat,
  deleteChat,
  deleteMessage,
  editMessage,
  getMessages,
  setIsMessagesLoading,
  setIsNotFound,
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
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data: chats } = await chatService.getChats();

      const userIds = chats
        .map((chat) => chat.users.map((user) => user.id))
        .join(' ');
      if (!userIds) {
        throw new Error('Not Found');
      }

      const socket = chatService.connect(userIds);

      socket.onAny((event: string, ...errors: unknown[]) => {
        if (
          event === 'exception' &&
          (errors as AxiosError[])[0]?.status === 'error' &&
          (errors as AxiosError[])[0]?.message
        ) {
          switch ((errors as AxiosError[])[0].message) {
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

      socket.on('get-messages', (response: GetMessagesResponse) => {
        dispatch(getMessages(response));
      });

      socket.on('delete-message', (data: ReceivedMessage) => {
        dispatch(deleteMessage(data));
      });

      socket.on('block-chat', (data: ChatBlockResponse) => {
        dispatch(blockChat(data));
      });

      socket.on('unblock-chat', (data: ChatUnblockResponse) => {
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

      socket.once('connect-chat', async () => {
        const response = await chatService.getChat(chatId);
        const chat = response.data;
        dispatch(setCurrentChatData(chat));
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

export const getMessagesThunk = createAsyncThunk(
  'chat/getMessages',
  (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { chat } = getState() as RootState;
      const { chats, currentChatId, isMessagesLoading } = chat;

      if (!isMessagesLoading && currentChatId) {
        chatService.getMessages(
          currentChatId,
          chats[chats.findIndex((item) => item.id === currentChatId)].messages
            .length
        );
        dispatch(setIsMessagesLoading(true));
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const deleteMessageThunk = createAsyncThunk(
  'chat/deleteMessage',
  (messageId: string, { rejectWithValue, getState }) => {
    try {
      const { chat } = getState() as RootState;
      const { currentChatId } = chat;

      if (currentChatId) {
        chatService.deleteMessage(currentChatId, messageId);
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const editMessageThunk = createAsyncThunk(
  'chat/editMessage',
  (
    args: { messageId: string; text: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const { chat } = getState() as RootState;
      const { currentChatId } = chat;

      if (currentChatId) {
        chatService.editMessage(currentChatId, args.messageId, args.text);
      }
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
