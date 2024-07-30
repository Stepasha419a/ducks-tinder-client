import type { Chat, Message, ReceivedNewMessage, ShortUser } from '@shared/api';

export interface ChatInitialState {
  chat: Chat | null;
  isChatLoading: boolean;
  chats: Chat[];
  messages: Message[];
  newMessagesCount: number | null;
  isSocketConnected: boolean;
  isLoading: boolean;
  isEnded: boolean;
  isFetched: boolean;
  isNotFound: boolean;
  isMessagesLoading: boolean;
  isMessagesEnded: boolean;
  currentChatId: string | null;
  chatMember: ShortUser | null;
}

export interface PushNewMessage extends ReceivedNewMessage {
  currentUserId: string;
}
