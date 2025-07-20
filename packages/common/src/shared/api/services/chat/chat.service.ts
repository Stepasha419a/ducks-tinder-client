import type { Chat, ShortUser } from '@shared/api';
import { instance } from '@shared/api';
import { COMMON_LIB_SETTINGS, type PaginationParams } from '@shared/lib';

import { getMockableService } from '../mock';
import { chatMockService } from './chat.mock-service';
import { createChatSocket } from './chat.socket';
import type {
  ChatConnectReturn,
  ChatsConnectReturn,
  ChatService,
  NewMessagesCount,
  ShortMessagesPagination,
} from './chat-service.interface';

export const createChatService = (): ChatService => {
  const chatSocket = createChatSocket();

  return getMockableService(
    {
      async getChat(chatId: string) {
        return instance.get<Chat>(
          `${COMMON_LIB_SETTINGS.CHAT_SERVICE_URL}/chat/${chatId}`
        );
      },
      async getChats(params: PaginationParams) {
        return instance.get<Chat[]>(
          `${COMMON_LIB_SETTINGS.CHAT_SERVICE_URL}/chat`,
          {
            params,
          }
        );
      },
      async getMessages(chatId: string, params: PaginationParams) {
        return instance.get<ShortMessagesPagination>(
          `${COMMON_LIB_SETTINGS.CHAT_SERVICE_URL}/chat/${chatId}/messages`,
          { params }
        );
      },
      async getNewMessagesCount() {
        return instance.get<NewMessagesCount>(
          `${COMMON_LIB_SETTINGS.CHAT_SERVICE_URL}/chat/new`
        );
      },
      async getMember(memberId: string) {
        return instance.get<ShortUser>(
          `${COMMON_LIB_SETTINGS.CHAT_SERVICE_URL}/chat/member/${memberId}`
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
};
