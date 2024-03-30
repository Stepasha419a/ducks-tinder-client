import type { Socket } from 'socket.io-client';
import { instance } from '@shared/api';
import type { Chat, ShortUser } from '@shared/api/interfaces';
import { chatSocket } from './chat.socket';
import type { ShortMessagesPagination } from './chat-service.interface';
import type { PaginationParams } from '@shared/lib/interfaces';

export const chatService = {
  async getChats(params: PaginationParams) {
    return instance.get<Chat[]>(
      `${import.meta.env.VITE_CHAT_SERVICE_URL!}/chat`,
      {
        params,
      }
    );
  },
  async getMessages(chatId: string, params: PaginationParams) {
    return instance.get<ShortMessagesPagination>(
      `${import.meta.env.VITE_CHAT_SERVICE_URL!}/chat/${chatId}/messages`,
      { params }
    );
  },
  async getMember(memberId: string) {
    return instance.get<ShortUser>(
      `${import.meta.env.VITE_CHAT_SERVICE_URL!}/chat/member/${memberId}`
    );
  },
  connect(): Socket {
    return chatSocket.connect();
  },
  connectChat(chatId: string): Socket {
    return chatSocket.connectChat(chatId);
  },
  sendMessage(
    chatId: string,
    text: string,
    repliedId: string | null = null
  ): void {
    chatSocket.sendMessage(chatId, text, repliedId);
  },
  deleteMessage(messageId: string): void {
    chatSocket.deleteMessage(messageId);
  },
  editMessage(messageId: string, text: string): void {
    chatSocket.editMessage(messageId, text);
  },
  blockChat(chatId: string): void {
    chatSocket.blockChat(chatId);
  },
  unblockChat(chatId: string): void {
    chatSocket.unblockChat(chatId);
  },
  deleteChat(chatId: string): void {
    chatSocket.deleteChat(chatId);
  },
  disconnectChat(chatId: string): void {
    chatSocket.disconnectChat(chatId);
  },
  disconnect(): void {
    chatSocket.disconnect();
  },
};
