import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import type { SendMessage } from '@shared/api/interfaces';

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
  connectChat(chatId: string): Socket {
    this._socket = io('http://localhost:5000/chat/socket', {
      query: { chatId },
    });

    this._socket.emit('connectChat', chatId);

    this._sockets.add(this._socket);

    // TODO: fix this return by adding some idk, methods that require callbacks on every event
    return this._socket;
  },
  sendMessage(text: string, userId: string, chatId: string): void {
    const message: SendMessage = {
      text,
      userId,
      chatId,
    };
    this._socket!.send(message);
  },
  disconnectChat(): void {
    if (this._socket) {
      this._socket.emit('disconnectChat');
      this._socket.close();
    }
  },
  closeAllSockets(): void {
    this._sockets.forEach((socket) => {
      socket.close();
      this._sockets.delete(socket);
    });
  },
};
