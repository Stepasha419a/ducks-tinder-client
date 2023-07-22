import type { Message, ShortChat } from '@shared/api/interfaces';

export interface ChatInitialState {
  chats: ShortChat[];
  isConnected: boolean;
  isLoading: boolean;
  isNotFound: boolean;
  isMessagesInitialLoading: boolean;
  isMessagesLoading: boolean;
  maxMessagesCount: number;
  isMessagesEnded: boolean;
  currentChatId: string;
  repliedMessage: Message | null;
  isChatUserPopup: boolean;
  currentMessage: Message | null;
  isMessageEditing: boolean;
}

export interface GetMessagesResponse {
  chatId: string;
  messages: Message[];
}

export interface ReceivedMessage {
  chatId: string;
  message: Message;
}
