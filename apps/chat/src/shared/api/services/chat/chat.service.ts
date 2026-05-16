import { chatMockService } from './chat.mock-service';
import { createChatSocket } from './chat.socket';
import type {
  ChatConnectReturn,
  ChatsConnectReturn,
  ChatService,
  NewMessagesCount,
  ShortMessagesPagination,
} from './chat-service.interface';
import type { PaginationParams, ShortUser } from '@ducks-tinder-client/common';
import { getMockableService, instance } from '@ducks-tinder-client/common';
import type { Chat } from '@shared/api';

export const createChatService = (): ChatService => {
  const chatSocket = createChatSocket();

  return getMockableService(
    {
      async getChat(chatId: string) {
        return instance.get<Chat>(
          `${window._env_.VAR_CHAT_SERVICE_URL}/chat/${chatId}`
        );
      },
      async getChats(params: PaginationParams) {
        return instance.get<Chat[]>(
          `${window._env_.VAR_CHAT_SERVICE_URL}/chat`,
          {
            params,
          }
        );
      },
      async getMessages(chatId: string, params: PaginationParams) {
        return instance.get<ShortMessagesPagination>(
          `${window._env_.VAR_CHAT_SERVICE_URL}/chat/${chatId}/messages`,
          { params }
        );
      },
      async getNewMessagesCount() {
        return instance.get<NewMessagesCount>(
          `${window._env_.VAR_CHAT_SERVICE_URL}/chat/new`
        );
      },
      async getMember(memberId: string) {
        return instance.get<ShortUser>(
          `${window._env_.VAR_CHAT_SERVICE_URL}/chat/member/${memberId}`
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

interface Instances {
  chatService: ChatService | null;
}

const instances: Instances = {
  chatService: null,
};

const getOrCreateService = <T extends Instances[keyof Instances]>(
  key: keyof Instances,
  createService: () => T
): T => {
  if (!instances[key]) {
    instances[key] = createService();
  }

  return instances[key] as T;
};

export const getChatService = () =>
  getOrCreateService('chatService', createChatService);
