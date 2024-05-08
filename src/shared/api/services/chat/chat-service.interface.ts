import type { Socket } from 'socket.io-client';
import type { Message } from '../../interfaces';

export interface ShortMessagesPagination {
  chatId: string;
  messages: Message[];
}

export type ChatsConnectReturn = Pick<Socket, 'on' | 'onAny'>;
export type ChatConnectReturn = Pick<Socket, 'once'>;

export interface ChatSocket {
  _socket: Socket | null;
  connect: () => ChatsConnectReturn;
  connectChat: (chatId: string) => ChatConnectReturn | null;
  sendMessage: (chatId: string, text: string, repliedId: string | null) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, text: string) => void;
  blockChat: (chatId: string) => void;
  unblockChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  disconnectChat: (chatId: string) => void;
  disconnect: () => void;
}

export enum ChatSocketEvent {
  Connect = 'connect-chats',
  ConnectChat = 'connect-chat',
  SendMessage = 'send-message',
  DeleteMessage = 'delete-message',
  EditMessage = 'edit-message',
  BlockChat = 'block-chat',
  UnblockChat = 'unblock-chat',
  DeleteChat = 'delete-chat',
  DisconnectChat = 'disconnect-chat',
}
