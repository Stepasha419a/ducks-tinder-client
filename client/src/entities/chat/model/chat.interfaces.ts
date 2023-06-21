import type { Message, ShortChat } from '@shared/api/interfaces';

export interface ChatInitialState {
  chats: ShortChat[];
  isConnected: boolean;
  isLoading: boolean;
  isMessagesInitialLoading: boolean;
  currentMessages: Message[];
  maxMessagesCount: number;
  isMessagesEnded: boolean;
  currentChatId: string;
}
