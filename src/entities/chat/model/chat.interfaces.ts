import type { Chat, Message, ShortUser } from '@shared/api/interfaces';

export interface ChatInitialState {
  chats: Chat[];
  messages: Message[];
  isSocketConnected: boolean;
  isChatConnected: boolean;
  isLoading: boolean;
  isEnded: boolean;
  isNotFound: boolean;
  isMessagesLoading: boolean;
  isMessagesEnded: boolean;
  currentChatId: string | null;
  chatMember: ShortUser | null;
}

export interface ReceivedMessage extends Message {
  chatId: string;
}

export type ReceivedChatBlock = Pick<Chat, 'id' | 'blocked' | 'blockedById'>;
