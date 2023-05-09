import type { ChatWithUsers, Message, User } from '@shared/api/interfaces';

export interface ChatInitialState {
  chats: ChatWithUsers[];
  isConnected: boolean;
  isLoading: boolean;
  currentMessages: Message[];
  currentChatId: string;
}
