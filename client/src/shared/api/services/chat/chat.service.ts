import type { Socket } from 'socket.io-client';
import { instance } from '@shared/api';
import type { Chat } from '@shared/api/interfaces';
import { chatSocket } from './chat.socket';

export const chatService = {
  async getChats(id: string) {
    return instance.get<Chat[]>(`chat/${id}`);
  },
  async getChat(id: string) {
    return instance.get<Chat>(`chat/one/${id}`);
  },
  async createChat(ids: string[]) {
    return instance.post<string[]>('chat/', ids);
  },
  connectChat(id: string): Socket {
    return chatSocket.connectChat(id);
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
