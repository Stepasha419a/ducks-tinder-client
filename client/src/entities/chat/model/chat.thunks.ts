import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Message } from '@shared/api/interfaces';
import { chatService } from '@shared/api/services';
import { returnErrorMessage } from '@shared/helpers';
import { pushNewMessage, setCurrentChatData } from '@entities/chat/model';
import { getMessages } from './chat.slice';

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
  (args: { chatId: string }, { rejectWithValue, dispatch }) => {
    try {
      const { chatId } = args;

      const socket = chatService.connectChat(chatId);

      socket.on('connect-chat', async () => {
        const response = await chatService.getChat(chatId);
        const chat = response.data;
        dispatch(setCurrentChatData(chat));
      });

      socket.on('send-message', (message: Message) => {
        dispatch(pushNewMessage(message));
      });

      socket.on('get-messages', (data: Message[]) => {
        dispatch(getMessages(data));
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
  (_, { rejectWithValue, getState }) => {
    try {
      const { chat } = getState() as RootState;
      const { currentMessages } = chat;

      chatService.getMessages(currentMessages.length);
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
  (text: string, { rejectWithValue }) => {
    try {
      chatService.sendMessage(text);
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
