import type { Socket } from 'socket.io-client';
import { instance } from '@shared/api';
import type { Chat, ShortChat } from '@shared/api/interfaces';
import { chatSocket } from './chat.socket';

export const chatService = {
  async getChats() {
    return instance.get<ShortChat[]>('chats');
  },
  async getChat(chatId: string) {
    return instance.get<Chat>(`chats/${chatId}`);
  },
  connect(): Socket {
    return chatSocket.connect();
  },
  connectChat(chatId: string): Socket {
    return chatSocket.connectChat(chatId);
  },
  getMessages(chatId: string, haveCount: number): void {
    chatSocket.getMessages(chatId, haveCount);
  },
  sendMessage(
    chatId: string,
    text: string,
    repliedId: string | null = null
  ): void {
    chatSocket.sendMessage(chatId, text, repliedId);
  },
  deleteMessage(chatId: string, messageId: string): void {
    chatSocket.deleteMessage(chatId, messageId);
  },
  editMessage(chatId: string, messageId: string, text: string): void {
    chatSocket.editMessage(chatId, messageId, text);
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
};
