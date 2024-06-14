import { createAsyncThunk } from '@reduxjs/toolkit';
import { pushNewMessage, setCurrentChatData } from '@entities/chat';
import { checkAuthThunk } from '@entities/user';
import type {
  Message,
  ReceivedChatBlock,
  ReceivedMessage,
  ReceivedNewMessage,
} from '@shared/api/interfaces';
import { chatService } from '@shared/api/services';
import { ChatSocketEvent } from '@shared/api/services';
import { returnErrorMessage } from '@shared/helpers';
import { PAGINATION_TAKE } from '@shared/lib/constants';
import type {
  PaginationParams,
  WsExceptionError,
} from '@shared/lib/interfaces';
import {
  blockChat,
  deleteChat,
  deleteMessage,
  editMessage,
  setIsNotFound,
  unblockChat,
} from './chat.slice';

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

      if (chats.length > 0) {
        return [];
      }

      const response = await chatService.getChats(params);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const connectChatsThunk = createAsyncThunk(
  'chat/connectChats',
  (_, { rejectWithValue, dispatch }) => {
    try {
      const { on, onAny } = chatService.connect();

      onAny((event: string, ...errors: unknown[]) => {
        if (event === 'exception' && (errors[0] as WsExceptionError).message) {
          switch ((errors[0] as WsExceptionError).message) {
            case 'Unauthorized':
              dispatch(checkAuthThunk());
              break;
            case 'Validation failed (uuid v 4 is expected)':
            case 'Not Found':
              dispatch(setIsNotFound(true));
              break;
            default:
              break;
          }
        }
      });

      on(ChatSocketEvent.SendMessage, (data: ReceivedNewMessage) => {
        dispatch(pushNewMessage(data));
      });

      on(ChatSocketEvent.EditMessage, (data: ReceivedMessage) => {
        dispatch(editMessage(data));
      });

      on(ChatSocketEvent.DeleteMessage, (data: ReceivedMessage) => {
        dispatch(deleteMessage(data));
      });

      on(ChatSocketEvent.BlockChat, (data: ReceivedChatBlock) => {
        dispatch(blockChat(data));
      });

      on(ChatSocketEvent.UnblockChat, (data: ReceivedChatBlock) => {
        dispatch(unblockChat(data));
      });

      on(ChatSocketEvent.DeleteChat, (deletedChatId: string) => {
        dispatch(deleteChat(deletedChatId));
      });
    } catch (error: unknown) {
      console.log(error);
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
      const { currentChatId, messages } = chat;

      if (currentChatId) {
        const params: PaginationParams = {
          skip: messages.length,
          take: PAGINATION_TAKE,
        };

        const response = await chatService.getMessages(currentChatId, params);
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
  (
    args: { text: string; repliedMessage: Message | null },
    { rejectWithValue, getState }
  ) => {
    try {
      const { chat } = getState() as RootState;
      const { currentChatId } = chat;

      const { text, repliedMessage } = args;

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

export const getMemberThunk = createAsyncThunk(
  'chat/getMember',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        chat: { chat: currentChat },
      } = getState() as RootState;

      if (currentChat) {
        const response = await chatService.getMember(currentChat.memberId);
        return response.data;
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
