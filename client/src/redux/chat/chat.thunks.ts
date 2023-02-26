import { IUser } from '../../models/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatApi } from '../../api/chat/chat.api';
import { chatSocket } from '../../api/chat/chat.socket';
import { IChat, IMessage } from '../../models/IChat';
import { RootState } from '../store';
import { fetchUserById } from '../users/users.thunks';
import {
  pushNewMessage,
  pushMessage,
  setCurrentChatId,
  setCurrentChatMembers,
  setCurrentMessages,
  setIsConnected,
} from './chat.slice';

export const getChatsThunk = createAsyncThunk(
  'chat/getChats',
  async function (id: string, { rejectWithValue, getState }) {
    try {
      const { usersPage } = getState() as RootState;
      const { currentUser } = usersPage;

      const response = await chatApi.getChats(id);

      const chats = await response.data;

      let allMembers: IUser[] = [];
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
  async function (
    args: { chatId: string },
    { rejectWithValue, dispatch, getState }
  ) {
    try {
      const { chatId } = args;
      const socket = chatSocket.connectChat(chatId);

      socket.on('connected', async () => {
        dispatch(setCurrentChatId(chatId));
        dispatch(setIsConnected(true));
        const response = await chatApi.getChat(chatId);
        const chat = await response.data;
        dispatch(setCurrentChatMembers(chat));
        dispatch(setCurrentMessages(chat.messages));
      });

      socket.on('message', (message: IMessage) => {
        const { chatPage } = getState() as RootState;
        dispatch(pushNewMessage(message));
        const chatIndex = chatPage.chats.findIndex(
          (chat: IChat) => chat._id === chatPage.currentChatId
        );
        dispatch(pushMessage({ chatIndex, message: message }));
      });

      socket.on('disconnected', () => {
        dispatch(setIsConnected(false));
        dispatch(setCurrentMessages([]));
        dispatch(setCurrentChatId(''));
      });
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

      chatSocket.sendMessage(
        content,
        currentUser.name,
        currentUser._id
      );
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
