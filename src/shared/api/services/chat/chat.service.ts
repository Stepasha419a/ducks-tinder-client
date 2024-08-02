import type { Chat, ShortUser } from '@shared/api';
import { instance } from '@shared/api';
import { chatMockService } from '@shared/api';
import { getMockableService } from '@shared/api';
import type { PaginationParams } from '@shared/lib';
import type {
  ChatConnectReturn,
  ChatService,
  ChatsConnectReturn,
  NewMessagesCount,
  ShortMessagesPagination,
} from './chat-service.interface';
import { chatSocket } from './chat.socket';

export const chatService: ChatService = getMockableService(
  {
    async getChat(chatId: string) {
      return instance.get<Chat>(
        `${import.meta.env.VITE_CHAT_SERVICE_URL}/chat/${chatId}`
      );
    },
    async getChats(params: PaginationParams) {
      return instance.get<Chat[]>(
        `${import.meta.env.VITE_CHAT_SERVICE_URL}/chat`,
        {
          params,
        }
      );
    },
    async getMessages(chatId: string, params: PaginationParams) {
      return instance.get<ShortMessagesPagination>(
        `${import.meta.env.VITE_CHAT_SERVICE_URL}/chat/${chatId}/messages`,
        { params }
      );
    },
    async getNewMessagesCount() {
      return instance.get<NewMessagesCount>(
        `${import.meta.env.VITE_CHAT_SERVICE_URL}/chat/new`
      );
    },
    async getMember(memberId: string) {
      return instance.get<ShortUser>(
        `${import.meta.env.VITE_CHAT_SERVICE_URL}/chat/member/${memberId}`
      );
    },
    connect(): ChatsConnectReturn {
      return chatSocket.connect();
    },
    connectChat(chatId: string): ChatConnectReturn | null {
      return chatSocket.connectChat(chatId);
    },
    sendMessage(
      chatId: string,
      text: string,
      repliedId: string | null = null
    ): void {
      chatSocket.sendMessage(chatId, text, repliedId);
    },
    deleteMessage(messageId: string): void {
      chatSocket.deleteMessage(messageId);
    },
    editMessage(messageId: string, text: string): void {
      chatSocket.editMessage(messageId, text);
    },
    blockChat(chatId: string): void {
      chatSocket.blockChat(chatId);
    },
    unblockChat(chatId: string): void {
      chatSocket.unblockChat(chatId);
    },
    deleteChat(chatId: string): void {
      chatSocket.deleteChat(chatId);
    },
    disconnectChat(chatId: string): void {
      chatSocket.disconnectChat(chatId);
    },
    disconnect(): void {
      chatSocket.disconnect();
    },
  },
  chatMockService
);
