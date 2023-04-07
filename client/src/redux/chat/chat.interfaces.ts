import type { Chat, Message, User } from '../../shared/api/interfaces';

export interface ChatInitialState {
  chats: Chat[];
  chatsUsers: User[];
  isConnected: boolean;
  isLoading: boolean;
  currentMessages: Message[];
  currentChatId: string;
  currentChatMembers: User[];
}

export interface GetChatsThunkPayload {
  chats: Chat[];
  allMembers: User[];
}
