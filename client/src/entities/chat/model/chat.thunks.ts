import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Message, User } from '@shared/api/interfaces';
import { chatApi } from '@shared/api/chat/chat.api';
import { chatSocket } from '@shared/api/chat/chat.socket';
import { returnErrorMessage } from '@shared/helpers';
import type { RootState } from '@app/store';
import { fetchUserById } from '@entities/user/model';
import {
  disconnectChat,
  pushNewMessage,
  setCurrentChatData,
} from '@entities/chat/model';

export const getChatsThunk = createAsyncThunk(
  'chat/getChats',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const { user } = getState() as RootState;
      const { currentUser } = user;

      const response = await chatApi.getChats(id);

      const chats = response.data;

      const allMembers: User[] = [];

      // TODO: do this server endpoint
      for await (const chat of chats) {
        for (const member of chat.members) {
          if (member !== id) {
            const chatMember = await fetchUserById(member);
            allMembers.push(chatMember);
          }
        }
      }

      allMembers.push(currentUser);

      return { chats, allMembers };
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
      await chatApi.createChat([currentUser._id, currentPair!._id]);
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

      const socket = chatSocket.connectChat(chatId);

      socket.on('connected', async () => {
        const response = await chatApi.getChat(chatId);
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
      chatSocket.disconnectChat();
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const closeAllSockets = createAsyncThunk(
  'chat/closeSocket',
  (_, { rejectWithValue }) => {
    try {
      chatSocket.closeAllSockets();
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

      chatSocket.sendMessage(content, currentUser.name, currentUser._id);
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);