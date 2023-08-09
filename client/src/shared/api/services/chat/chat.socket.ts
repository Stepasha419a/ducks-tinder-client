import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

interface ChatSocket {
  _socket: Socket | null;
  connect: () => Socket;
  connectChat: (chatId: string) => Socket;
  sendMessage: (chatId: string, text: string, repliedId: string | null) => void;
  getMessages: (chatId: string, haveCount: number) => void;
  deleteMessage: (chatId: string, messageId: string) => void;
  editMessage: (chatId: string, messageId: string, text: string) => void;
  blockChat: (chatId: string) => void;
  unblockChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  disconnectChat: (chatId: string) => void;
}

export const chatSocket: ChatSocket = {
  _socket: null,
  connect(): Socket {
    this._socket = io('http://localhost:5000/chat/socket', {
      withCredentials: true,
      transports: ['websocket'],
      auth: {
        authorization: localStorage.getItem('accessToken'),
      },
    });

    this._socket.emit('connect-chats');

    return this._socket;
  },
  connectChat(chatId: string): Socket {
    this._socket!.emit('connect-chat', { chatId });

    // TODO: fix this return by adding some idk, methods that require callbacks on every event
    return this._socket!;
  },
  sendMessage(chatId: string, text: string, repliedId: string | null): void {
    this._socket!.emit('send-message', { chatId, text, repliedId });
  },
  getMessages(chatId: string, haveCount: number): void {
    this._socket!.emit('get-messages', { chatId, haveCount });
  },
  deleteMessage(chatId: string, messageId: string): void {
    this._socket!.emit('delete-message', { chatId, messageId });
  },
  editMessage(chatId: string, messageId: string, text: string): void {
    this._socket!.emit('edit-message', { chatId, messageId, text });
  },
  blockChat(chatId: string): void {
    this._socket!.emit('block-chat', { chatId });
  },
  unblockChat(chatId: string): void {
    this._socket!.emit('unblock-chat', { chatId });
  },
  deleteChat(chatId: string): void {
    this._socket!.emit('delete-chat', { chatId });
  },
  disconnectChat(chatId: string): void {
    if (this._socket) {
      this._socket.emit('disconnect-chat', { chatId });
    }
  },
};
