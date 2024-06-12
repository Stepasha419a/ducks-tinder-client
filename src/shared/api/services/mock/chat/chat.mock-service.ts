/* eslint-disable @typescript-eslint/no-unused-vars */

import { mockStorage, resolveAxiosResponse } from '../mock';
import { chatStub, shortMessagesPaginationStub } from './chat.stub';
import { shortUserStub } from '../user/user.stub';
import type { PaginationParams } from '@shared/lib/interfaces';
import EventEmitter from 'events';
import type {
  ChatConnectReturn,
  ChatService,
  ChatsConnectReturn,
} from '../../chat/chat-service.interface';
import { ChatSocketEvent } from '../../chat/chat-service.interface';
import type {
  ReceivedChatBlock,
  ReceivedMessage,
  ReceivedNewMessage,
} from '@shared/api/interfaces';

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
    return resolveAxiosResponse(1);
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
    eventEmitter.emit(ChatSocketEvent.SendMessage, {
      message: {
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
      },
      newMessagesCount: 1,
    } as ReceivedNewMessage);
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
  },
  unblockChat(chatId: string) {
    eventEmitter.emit(ChatSocketEvent.BlockChat, {
      id: chatId,
      blocked: false,
      blockedById: undefined,
    } as ReceivedChatBlock);
  },
  deleteChat(chatId: string) {
    eventEmitter.emit(ChatSocketEvent.DeleteChat, chatId);
  },
  disconnectChat(chatId: string) {
    eventEmitter.emit(ChatSocketEvent.DisconnectChat, chatId);
    mockStorage.currentChatId = null;
  },
  disconnect() {},
};
