import { io } from 'socket.io-client';

import type { ChatSocket } from './chat-service.interface';
import { ChatSocketEvent } from './chat-service.interface';
import { LIB_SETTINGS } from '@shared/lib';

export const chatSocket: ChatSocket = {
  _socket: null,
  connect() {
    if (!this._socket) {
      const accessToken = 'Bearer ' + localStorage.getItem('accessToken')!;
      this._socket = io(`${LIB_SETTINGS.CHAT_SERVICE_URL}/chat/socket`, {
        withCredentials: true,
        transports: ['websocket'],
        auth: {
          authorization: accessToken,
        },
      });

      this._socket.emit(ChatSocketEvent.Connect);
    }

    return {
      on: this._socket.on.bind(this._socket),
      onAny: this._socket.onAny.bind(this._socket),
    };
  },
  connectChat(chatId: string) {
    if (!this._socket) {
      return null;
    }

    this._socket.emit(ChatSocketEvent.ConnectChat, chatId);
    return { once: this._socket.once.bind(this._socket) };
  },
  sendMessage(chatId: string, text: string, repliedId: string | null): void {
    this._socket?.emit(ChatSocketEvent.SendMessage, {
      chatId,
      text,
      repliedId,
    });
  },
  deleteMessage(messageId: string): void {
    this._socket?.emit(ChatSocketEvent.DeleteMessage, messageId);
  },
  editMessage(messageId: string, text: string): void {
    this._socket?.emit(ChatSocketEvent.EditMessage, { messageId, text });
  },
  blockChat(chatId: string): void {
    this._socket?.emit(ChatSocketEvent.BlockChat, chatId);
  },
  unblockChat(chatId: string): void {
    this._socket?.emit(ChatSocketEvent.UnblockChat, chatId);
  },
  deleteChat(chatId: string): void {
    this._socket?.emit(ChatSocketEvent.DeleteChat, chatId);
  },
  disconnectChat(chatId: string): void {
    this._socket?.emit(ChatSocketEvent.DisconnectChat, chatId);
  },
  disconnect(): void {
    this._socket?.close();
    this._socket = null;
  },
};
