import type { AxiosResponse } from 'axios';
import type { Socket } from 'socket.io-client';
import type { PaginationParams } from '@shared/lib/interfaces';
import type { Chat, Message, ShortUser } from '../../interfaces';

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

export interface ChatService {
  getChat(chatId: string): Promise<AxiosResponse<Chat>>;
  getChats(params: PaginationParams): Promise<AxiosResponse<Chat[]>>;
  getMessages(
    chatId: string,
    params: PaginationParams
  ): Promise<AxiosResponse<ShortMessagesPagination>>;
  getNewMessagesCount(): Promise<AxiosResponse<number>>;
  getMember(memberId: string): Promise<AxiosResponse<ShortUser>>;
  getNewMessagesCount(chatId: string): Promise<AxiosResponse<number>>;
  getNewMessagesCount(chatId: string): Promise<AxiosResponse<number>>;
  connect(): ChatsConnectReturn;
  connectChat(chatId: string): ChatConnectReturn | null;
  sendMessage(chatId: string, text: string, repliedId: string | null): void;
  deleteMessage(messageId: string): void;
  editMessage(messageId: string, text: string): void;
  blockChat(chatId: string): void;
  unblockChat(chatId: string): void;
  deleteChat(chatId: string): void;
  disconnectChat(chatId: string): void;
  disconnect(): void;
}
