/* eslint-disable @typescript-eslint/no-unused-vars */

import EventEmitter from 'events';
import type {
  ReceivedChatBlock,
  ReceivedMessage,
  ReceivedNewMessage,
} from '@shared/api';
import {
  ChatSocketEvent,
  shortUserStub,
  type ChatConnectReturn,
  type ChatService,
  type ChatsConnectReturn,
} from '@shared/api';
import type { PaginationParams } from '@shared/lib';
import { mockStorage, resolveAxiosResponse } from '../mock';
import { chatStub, shortMessagesPaginationStub } from './chat.stub';

const eventEmitter = new EventEmitter();

function listenEvent(
  e: ChatSocketEvent,
  listener: (...args: unknown[]) => void
) {
  eventEmitter.on(e, listener);
}

function listenEventOnce(
  e: ChatSocketEvent,
  listener: (...args: unknown[]) => void
) {
  eventEmitter.once(e, listener);
  eventEmitter.emit(ChatSocketEvent.ConnectChat);
}

export const chatMockService: ChatService = {
  async getChat(chatId: string) {
    const chat = mockStorage.chats.find((item) => item.id === chatId);
    return resolveAxiosResponse(chat || chatStub);
  },
  async getChats(params: PaginationParams) {
    return resolveAxiosResponse(mockStorage.chats);
  },
  async getMessages(chatId: string, params: PaginationParams) {
    const lastMessage = mockStorage.chats.find(
      (chat) => chat.id === chatId
    )?.lastMessage;
    return resolveAxiosResponse({
      chatId,
      messages: lastMessage ? [lastMessage] : [],
    });
  },
  async getNewMessagesCount() {
    return resolveAxiosResponse({ count: 1 });
  },
  async getMember(memberId: string) {
    const member = mockStorage.chats.find((item) => item.memberId === memberId);
    const memberObj = member ? { name: member.name } : {};
    return resolveAxiosResponse({ ...shortUserStub, ...memberObj });
  },
  connect() {
    return {
      on: listenEvent,
      onAny: () => {},
    } as unknown as ChatsConnectReturn;
  },
  connectChat(chatId: string) {
    mockStorage.currentChatId = chatId;
    return { once: listenEventOnce } as unknown as ChatConnectReturn;
  },
  sendMessage(chatId: string, text: string, repliedId: string | null) {
    const message = {
      avatar: '',
      chatId,
      text,
      replied: repliedId && {
        id: repliedId,
        name: 'replied',
        text: 'replied-text',
        userId: 'id',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: new Date().toISOString(),
      name: mockStorage.currentUser.name,
      userId: mockStorage.currentUser.id,
    };

    eventEmitter.emit(ChatSocketEvent.SendMessage, {
      message,
      newMessagesCount: 1,
    } as ReceivedNewMessage);

    setTimeout(() => {
      const chat = mockStorage.chats.find((item) => item.id === chatId);
      if (!chat || chat.blocked) {
        return;
      }

      eventEmitter.emit(ChatSocketEvent.SendMessage, {
        message: {
          avatar: '',
          chatId,
          text: 'response text. Hello :>',
          replied: {
            id: message.id,
            name: message.name,
            text: message.text,
            userId: message.userId,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          id: new Date().toISOString(),
          name: chat.name,
          userId: chat.memberId,
        },
        newMessagesCount: chat.newMessagesCount + 1,
      } as ReceivedNewMessage);
    }, 5000);
  },
  deleteMessage(messageId: string) {
    eventEmitter.emit(ChatSocketEvent.DeleteMessage, {
      id: messageId,
      chatId: mockStorage.currentChatId,
    } as ReceivedMessage);
  },
  editMessage(messageId: string, text: string) {
    eventEmitter.emit(ChatSocketEvent.EditMessage, {
      id: messageId,
      chatId: mockStorage.currentChatId,
      text,
      updatedAt: new Date().toISOString(),
    } as ReceivedMessage);
  },
  blockChat(chatId: string) {
    eventEmitter.emit(ChatSocketEvent.BlockChat, {
      id: chatId,
      blocked: true,
      blockedById: mockStorage.currentUser.id,
    } as ReceivedChatBlock);

    const chatIndex = mockStorage.chats.findIndex((item) => item.id === chatId);
    if (~chatIndex) {
      const chat = mockStorage.chats[chatIndex];
      mockStorage.chats[chatIndex] = {
        ...chat,
        blocked: true,
        blockedById: mockStorage.currentUser.id,
      };
    }
  },
  unblockChat(chatId: string) {
    eventEmitter.emit(ChatSocketEvent.BlockChat, {
      id: chatId,
      blocked: false,
      blockedById: undefined,
    } as ReceivedChatBlock);

    const chatIndex = mockStorage.chats.findIndex((item) => item.id === '');
    if (~chatIndex) {
      const chat = mockStorage.chats[chatIndex];
      mockStorage.chats[chatIndex] = {
        ...chat,
        blocked: false,
        blockedById: '',
      };
    }
  },
  deleteChat(chatId: string) {
    mockStorage.chats = mockStorage.chats.filter((chat) => chat.id !== chatId);
    eventEmitter.emit(ChatSocketEvent.DeleteChat, chatId);
  },
  disconnectChat(chatId: string) {
    eventEmitter.emit(ChatSocketEvent.DisconnectChat, chatId);
    mockStorage.currentChatId = null;
  },
  disconnect() {},
};
