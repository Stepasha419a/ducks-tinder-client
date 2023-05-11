import type { ChatWithUsers, Message } from '@shared/api/interfaces';

export interface ChatInitialState {
  chats: ChatWithUsers[];
  isConnected: boolean;
  isLoading: boolean;
  currentMessages: Message[];
  currentChatId: string;
}
