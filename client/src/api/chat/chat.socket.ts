import { io, Socket } from 'socket.io-client';
import { Message } from '../../models/Chat';

interface ChatSocket {
  _socket: Socket | null;
  _sockets: Set<Socket>;
  connectChat: (chatId: string) => Socket;
  sendMessage: (content: string, username: string, userId: string) => void;
  disconnectChat: () => void;
  closeAllSockets: () => void;
}

export const chatSocket: ChatSocket = {
  _socket: null,
  _sockets: new Set(),
  connectChat(chatId: string) {
    this._socket = io(`http://localhost:5000/chat/socket`, {
      query: { chatId },
    });

    this._socket.emit('connectChat');

    this._sockets.add(this._socket);

    return this._socket;
  },
  sendMessage(content: string, username: string, userId: string) {
    const message: Message = {
      id: Date.now().toString(),
      username,
      content,
      userId,
    };
    this._socket!.send(message);
  },
  disconnectChat() {
    if (this._socket) {
      this._socket.emit('disconnectChat');
    }
  },
  closeAllSockets() {
    this._sockets.forEach((socket) => {
      socket.close();
      this._sockets.delete(socket);
    });
  },
};
