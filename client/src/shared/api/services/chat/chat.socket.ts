import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

interface ChatSocket {
  _socket: Socket | null;
  _sockets: Set<Socket>;
  connectChat: (chatId: string) => Socket;
  sendMessage: (text: string, repliedId: string | null) => void;
  getMessages: (haveCount: number) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, text: string) => void;
  blockChat: () => void;
  disconnectChat: () => void;
  closeAllSockets: () => void;
}

export const chatSocket: ChatSocket = {
  _socket: null,
  _sockets: new Set(),
  connectChat(chatId: string): Socket {
    this._socket = io('http://localhost:5000/chat/socket', {
      query: { chatId },
      withCredentials: true,
      transports: ['websocket'],
      auth: {
        authorization: localStorage.getItem('accessToken'),
      },
    });

    this._socket.emit('connect-chat', chatId);

    this._sockets.add(this._socket);

    // TODO: fix this return by adding some idk, methods that require callbacks on every event
    return this._socket;
  },
  sendMessage(text: string, repliedId: string | null): void {
    this._socket!.emit('send-message', { text, repliedId });
  },
  getMessages(haveCount: number): void {
    this._socket!.emit('get-messages', { haveCount });
  },
  deleteMessage(messageId: string): void {
    this._socket!.emit('delete-message', { messageId });
  },
  editMessage(messageId: string, text: string): void {
    this._socket!.emit('edit-message', { messageId, text });
  },
  blockChat(): void {
    this._socket!.emit('block-chat');
  },
  disconnectChat(): void {
    if (this._socket) {
      this._socket.emit('disconnect-chat');
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
