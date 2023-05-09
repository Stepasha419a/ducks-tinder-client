import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Message } from '@shared/api/interfaces';
import { chatService } from '@shared/api/services';
import { returnErrorMessage } from '@shared/helpers';
import {
  disconnectChat,
  pushNewMessage,
  setCurrentChatData,
} from '@entities/chat/model';

export const getChatsThunk = createAsyncThunk(
  'chat/getChats',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data: chats } = await chatService.getChats(id);

      return chats;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const createChatThunk = createAsyncThunk(
  'chat/createChat',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState() as RootState;
      const { currentUser, currentPair } = user;
      await chatService.createChat([currentUser._id, currentPair!._id]);
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

      socket.on('connected', async () => {
        const response = await chatService.getChat(chatId);
        const chat = response.data;
        dispatch(setCurrentChatData(chat));
      });

      socket.on('message', (message: Message) => {
        dispatch(pushNewMessage(message));
      });

      socket.on('disconnected', () => {
        dispatch(disconnectChat());
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

export const closeAllSockets = createAsyncThunk(
  'chat/closeSocket',
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
  (content: string, { rejectWithValue, getState }) => {
    try {
      const { user } = getState() as RootState;
      const { currentUser } = user;

      chatService.sendMessage(content, currentUser.name, currentUser._id);
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
