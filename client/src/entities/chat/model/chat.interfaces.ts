import type { Message, ShortChat } from '@shared/api/interfaces';

export interface ChatInitialState {
  chats: ShortChat[];
  isConnected: boolean;
  isLoading: boolean;
  isMessagesLoading: boolean;
  currentMessages: Message[];
  currentChatId: string;
}
