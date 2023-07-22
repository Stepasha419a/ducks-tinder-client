import type { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Chat, ChatSocketQueryData } from '@shared/api/interfaces';
import { chatService } from '@shared/api/services';
import { returnErrorMessage } from '@shared/helpers';
import { pushNewMessage, setCurrentChatData } from '@entities/chat/model';
import type { GetMessagesResponse, ReceivedMessage } from './chat.interfaces';
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

export const connectChatThunk = createAsyncThunk(
  'chat/connectChat',
  (args: { chatId: string }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { chatId } = args;

      const { chat: chatState, user: userState } = getState() as RootState;
      const { chats } = chatState;
      const { currentUser } = userState;
      const userIds = chats
        .find((chat) => chat.id === chatId)
        ?.users.map((user) => user.id)
        .join(' ');
      if (!userIds) {
        throw new Error('Not Found Chat');
      }
      const chatData: ChatSocketQueryData = { chatId, userIds };

      const socket = chatService.connectChat(chatData, currentUser.id);

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

      socket.on('connect-chat', async () => {
        const response = await chatService.getChat(chatId);
        const chat = response.data;
        dispatch(setCurrentChatData(chat));
      });

      socket.on('send-message', (data: ReceivedMessage) => {
        dispatch(pushNewMessage(data));
      });

      socket.on('get-messages', (response: GetMessagesResponse) => {
        dispatch(getMessages(response));
      });

      socket.on('delete-message', (data: ReceivedMessage) => {
        dispatch(deleteMessage(data));
      });

      socket.on('edit-message', (data: ReceivedMessage) => {
        dispatch(editMessage(data));
      });

      socket.on('block-chat', (chat: Chat) => {
        dispatch(blockChat(chat));
      });

      socket.on('unblock-chat', (chat: Chat) => {
        dispatch(unblockChat(chat));
      });

      socket.on('delete-chat', (deletedChatId: string) => {
        dispatch(deleteChat(deletedChatId));
      });
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const disconnectChatThunk = createAsyncThunk(
  'chat/disconnectChat',
  (_, { rejectWithValue }) => {
    try {
      chatService.disconnectChat();
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

      if (!isMessagesLoading) {
        chatService.getMessages(
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
  (_, { rejectWithValue }) => {
    try {
      chatService.blockChat();
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const unblockChatThunk = createAsyncThunk(
  'chat/unblockChat',
  (_, { rejectWithValue }) => {
    try {
      chatService.unblockChat();
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const deleteChatThunk = createAsyncThunk(
  'chat/deleteChat',
  (_, { rejectWithValue }) => {
    try {
      chatService.deleteChat();
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const closeAllSocketsThunk = createAsyncThunk(
  'chat/closeAllSockets',
  (_, { rejectWithValue }) => {
    try {
      chatService.closeAllSockets();
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
      const { repliedMessage } = chat;

      let repliedId = null;
      if (repliedMessage) {
        repliedId = repliedMessage.id;
      }

      chatService.sendMessage(text, repliedId);
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
