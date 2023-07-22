import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import type { ChatSocketQueryData } from '../../interfaces';

interface ChatSocket {
  _socket: Socket | null;
  _sockets: Set<Socket>;
  connectChat: (chatData: ChatSocketQueryData, currentUserId: string) => Socket;
  sendMessage: (text: string, repliedId: string | null) => void;
  getMessages: (haveCount: number) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, text: string) => void;
  blockChat: () => void;
  unblockChat: () => void;
  deleteChat: () => void;
  disconnectChat: () => void;
  closeAllSockets: () => void;
}

export const chatSocket: ChatSocket = {
  _socket: null,
  _sockets: new Set(),
  connectChat(chatData: ChatSocketQueryData, currentUserId: string): Socket {
    this._socket = io('http://localhost:5000/chat/socket', {
      query: chatData,
      withCredentials: true,
      transports: ['websocket'],
      auth: {
        authorization: localStorage.getItem('accessToken'),
      },
    });

    this._socket.emit('connect-chat', currentUserId);

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
  unblockChat(): void {
    this._socket!.emit('unblock-chat');
  },
  deleteChat(): void {
    this._socket!.emit('delete-chat');
  },
  disconnectChat(): void {
    if (this._socket) {
      this._socket.emit('disconnect-chat');
      this._socket.close();
    }
  },
  closeAllSockets(): void {
    this._sockets.forEach((socket) => {
      socket.emit('disconnect-chat');
      socket.close();
      this._sockets.delete(socket);
    });
  },
};
