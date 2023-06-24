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
  connectChat(chatId: string): Socket {
    return chatSocket.connectChat(chatId);
  },
  sendMessage(text: string): void {
    chatSocket.sendMessage(text);
  },
  deleteMessage(messageId: string): void {
    chatSocket.deleteMessage(messageId);
  },
  editMessage(messageId: string, text: string): void {
    chatSocket.editMessage(messageId, text);
  },
  disconnectChat(): void {
    chatSocket.disconnectChat();
  },
  getMessages(haveCount: number): void {
    chatSocket.getMessages(haveCount);
  },
  closeAllSockets(): void {
    chatSocket.closeAllSockets();
  },
};
