import { IUser } from '../../models/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { io } from 'socket.io-client';
import { chatApi } from '../../api/chatApi';
import { IChat, IMessage } from '../../models/IChat';
import { RootState } from '../store';
import { fetchUserById } from '../users/users.thunks';
import { InitialState, pushMessage, setCurrentChatId, setCurrentChatMembers, setCurrentMessages, setIsConnected } from './chat.slice';

export const getChatsThunk = createAsyncThunk(
  'chat/getChats',
  async function (id: string, { rejectWithValue, getState }) {
    try {
      const response = await chatApi.getChats(id);
      const { usersPage } = getState() as RootState;
      const currentUser = usersPage.currentUser;

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
    args: { socket: any; chatId: string },
    { rejectWithValue, dispatch, getState }
  ) {
    try {
      const { socket, chatId } = args;
      socket.current = io(`http://localhost:5000/chat/socket`, {
        query: { chatId },
      });

      socket.current.emit('connectChat');

      socket.current.on('connected', async () => {
        dispatch(setCurrentChatId(chatId));
        dispatch(setIsConnected(true));
        const response = await chatApi.getChat(chatId);
        const chat = await response.data;
        dispatch(setCurrentChatMembers(chat));
        dispatch(setCurrentMessages(chat.messages));
      });

      socket.current.on('message', (message: IMessage) => {
        const { chatPage } = getState() as RootState;
        sendMessage(message, dispatch, chatPage);
      });

      socket.current.on('disconnected', () => {
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

export const disconnectChatThunk = createAsyncThunk(
  'chat/disconnectChat',
  function (args: { socket: any }, { rejectWithValue }) {
    try {
      const { socket } = args;

      socket.current.emit('disconnectChat');
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

function sendMessage(
  message: IMessage,
  dispatch: Dispatch<any>,
  chatPage: InitialState
) {
  dispatch(setCurrentMessages(message));
  const chatIndex = chatPage.chats.findIndex(
    (chat: IChat) => chat._id === chatPage.currentChatId
  );
  dispatch(pushMessage({ chatIndex, message: message }));
}
