import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

interface ChatSocket {
  _socket: Socket | null;
  connect: () => Socket;
  connectChat: (chatId: string) => Socket;
  sendMessage: (chatId: string, text: string, repliedId: string | null) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, text: string) => void;
  blockChat: (chatId: string) => void;
  unblockChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  disconnectChat: (chatId: string) => void;
  disconnect: () => void;
}

export const chatSocket: ChatSocket = {
  _socket: null,
  connect(): Socket {
    const accessToken = 'Bearer ' + localStorage.getItem('accessToken')!;
    this._socket = io(`${import.meta.env.VITE_CHAT_SERVICE_URL}/chat/socket`, {
      withCredentials: true,
      transports: ['websocket'],
      auth: {
        authorization: accessToken,
      },
    });

    this._socket.emit('connect-chats');

    return this._socket;
  },
  connectChat(chatId: string): Socket {
    this._socket!.emit('connect-chat', chatId);

    // TODO: fix this return by adding some idk, methods that require callbacks on every event
    return this._socket!;
  },
  sendMessage(chatId: string, text: string, repliedId: string | null): void {
    this._socket!.emit('send-message', { chatId, text, repliedId });
  },
  deleteMessage(messageId: string): void {
    this._socket!.emit('delete-message', messageId);
  },
  editMessage(messageId: string, text: string): void {
    this._socket!.emit('edit-message', { messageId, text });
  },
  blockChat(chatId: string): void {
    this._socket!.emit('block-chat', chatId);
  },
  unblockChat(chatId: string): void {
    this._socket!.emit('unblock-chat', chatId);
  },
  deleteChat(chatId: string): void {
    this._socket!.emit('delete-chat', chatId);
  },
  disconnectChat(chatId: string): void {
    if (this._socket) {
      this._socket.emit('disconnect-chat', chatId);
    }
  },
  disconnect(): void {
    this._socket?.close();
  },
};
