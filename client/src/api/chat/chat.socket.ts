import { io, Socket } from 'socket.io-client';
import { IMessage } from '../../models/IChat';

interface ChatSocket {
  socket: Socket | null;
  connectChat: (chatId: string) => Socket;
  sendMessage: (content: string, username: string, userId: string) => void;
  disconnectChat: () => void;
}

export const chatSocket: ChatSocket = {
  socket: null,
  connectChat(chatId: string) {
    this.socket = io(`http://localhost:5000/chat/socket`, {
      query: { chatId },
    });

    this.socket.emit('connectChat');

    return this.socket;
  },
  sendMessage(content: string, username: string, userId: string) {
    const message: IMessage = {
      id: Date.now().toString(),
      username,
      content,
      userId,
    };
    this.socket!.send(message);
  },
  disconnectChat() {
    this.socket && this.socket.emit('disconnectChat');
  },
};
