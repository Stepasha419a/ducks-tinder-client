import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatApi } from '../../api/chat/chat.api';
import { chatSocket } from '../../api/chat/chat.socket';
import { Message, User } from '../../shared/api/interfaces';
import { RootState } from '../store';
import { fetchUserById } from '../users/users.thunks';
import {
  disconnectChat,
  pushNewMessage,
  setCurrentChatData,
} from './chat.slice';

export const getChatsThunk = createAsyncThunk(
  'chat/getChats',
  async function (id: string, { rejectWithValue, getState }) {
    try {
      const { usersPage } = getState() as RootState;
      const { currentUser } = usersPage;

      const response = await chatApi.getChats(id);

      const chats = await response.data;

      let allMembers: User[] = [];
      for await (let chat of chats) {
        for (let member of chat.members) {
          if (member !== id) {
            const user = await fetchUserById(member);
            allMembers.push(user);
          }
        }
      }

      allMembers.push(currentUser);

      return { chats, allMembers };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
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
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const connectChatThunk = createAsyncThunk(
  'chat/connectChat',
  async function (args: { chatId: string }, { rejectWithValue, dispatch }) {
    try {
      const { chatId } = args;

      const socket = chatSocket.connectChat(chatId);

      socket.on('connected', async () => {
        const response = await chatApi.getChat(chatId);
        const chat = await response.data;
        dispatch(setCurrentChatData(chat));
      });

      socket.on('message', (message: Message) => {
        dispatch(pushNewMessage(message));
      });

      socket.on('disconnected', () => {
        dispatch(disconnectChat());
      });
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const disconnectChatThunk = createAsyncThunk(
  'chat/disconnectChat',
  function (_, { rejectWithValue }) {
    try {
      chatSocket.disconnectChat();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const closeAllSockets = createAsyncThunk(
  'chat/closeSocket',
  async function (_, { rejectWithValue }) {
    try {
      chatSocket.closeAllSockets();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
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
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);
