import type { Socket } from 'socket.io-client';
import { instance } from '@shared/api';
import type { Chat, ChatWithUsers, User } from '@shared/api/interfaces';
import { chatSocket } from './chat.socket';

export const chatService = {
  async getChats(userId: string) {
    return instance.get<ChatWithUsers[]>(`chat/${userId}`);
  },
  async getChat(chatId: string) {
    return instance.get<Chat>(`chat/one/${chatId}`);
  },
  async getChatMembers(chatId: string) {
    return instance.get<User[]>(`chat/members/${chatId}`);
  },
  async createChat(userIds: string[]) {
    return instance.post<string[]>('chat/', userIds);
  },
  connectChat(chatId: string): Socket {
    return chatSocket.connectChat(chatId);
  },
  sendMessage(content: string, username: string, userId: string): void {
    chatSocket.sendMessage(content, username, userId);
  },
  disconnectChat(): void {
    chatSocket.disconnectChat();
  },
  closeAllSockets(): void {
    chatSocket.closeAllSockets();
  },
};
