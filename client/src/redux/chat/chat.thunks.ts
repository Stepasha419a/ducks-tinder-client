import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatApi } from '../../api/chat/chat.api';
import { chatSocket } from '../../api/chat/chat.socket';
import type { Message, User } from '../../shared/api/interfaces';
import { returnErrorMessage } from '../../shared/helpers';
import type { RootState } from '../store';
import { fetchUserById } from '../users/users.thunks';
import {
  disconnectChat,
  pushNewMessage,
  setCurrentChatData,
} from './chat.slice';

export const getChatsThunk = createAsyncThunk(
  'chat/getChats',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const { usersPage } = getState() as RootState;
      const { currentUser } = usersPage;

      const response = await chatApi.getChats(id);

      const chats = response.data;

      const allMembers: User[] = [];

      // TODO: do this server endpoint
      for await (const chat of chats) {
        for (const member of chat.members) {
          if (member !== id) {
            const user = await fetchUserById(member);
            allMembers.push(user);
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
  async (
    args: { currentUserId: string; otherUserId: string },
    { rejectWithValue }
  ) => {
    try {
      await chatApi.createChat([args.currentUserId, args.otherUserId]);
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const connectChatThunk = createAsyncThunk(
  'chat/connectChat',
  async (args: { chatId: string }, { rejectWithValue, dispatch }) => {
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
  async (_, { rejectWithValue }) => {
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
      const { usersPage } = getState() as RootState;
      const { currentUser } = usersPage;

      chatSocket.sendMessage(content, currentUser.name, currentUser._id);
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
