import type { Socket } from 'socket.io-client';
import { instance } from '@shared/api';
import type { Chat, ShortChat, User } from '@shared/api/interfaces';
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
  sendMessage(content: string, userId: string, chatId: string): void {
    chatSocket.sendMessage(content, userId, chatId);
  },
  disconnectChat(): void {
    chatSocket.disconnectChat();
  },
  getMessages(user: User, chatId: string, takeOrder: number): void {
    chatSocket.getMessages(user, chatId, takeOrder);
  },
  closeAllSockets(): void {
    chatSocket.closeAllSockets();
  },
};
