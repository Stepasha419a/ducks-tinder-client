import type { ShortChat } from '@shared/api/interfaces';

export interface ChatInitialState {
  chats: ShortChat[];
  isConnected: boolean;
  isLoading: boolean;
  isMessagesInitialLoading: boolean;
  isMessagesLoading: boolean;
  maxMessagesCount: number;
  isMessagesEnded: boolean;
  currentChatId: string;
}
