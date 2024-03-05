import type { Chat, Message } from '@shared/api/interfaces';

export interface ChatInitialState {
  chats: Chat[];
  messages: Message[];
  isSocketConnected: boolean;
  isChatConnected: boolean;
  isLoading: boolean;
  isNotFound: boolean;
  isMessagesInitialLoading: boolean;
  isMessagesLoading: boolean;
  skipMessagesCount: number;
  isMessagesEnded: boolean;
  currentChatId: string | null;
  repliedMessage: Message | null;
  isChatUserPopup: boolean;
  currentMessage: Message | null;
  isMessageEditing: boolean;
}

export interface ReceivedMessage extends Message {
  chatId: string;
}

export type ReceivedChatBlock = Pick<Chat, 'id' | 'blocked' | 'blockedById'>;