import {
  ShortUser,
  ShortUserWithLocation,
  ShortUserWithoutDistance,
} from 'users/users.interface';

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  replied: {
    id: string;
    text: string;
    userId: string;
  };
}

export interface FullChatWithoutDistance {
  id: string;
  users: ShortUserWithLocation[];
  messages: Message[];
  blocked: boolean;
  blockedById: string;
}

// has all messages
export interface FullChat {
  id: string;
  users: ShortUser[];
  messages: Message[];
  messagesCount: number;
  blocked: boolean;
  blockedById: string;
}

// has only latest message
export interface ShortChat {
  id: string;
  users: ShortUserWithoutDistance[];
  messages: Message[];
  blocked: boolean;
  blockedById: string;
}

export interface ChatSocketQueryData {
  userIds: string[];
}

export interface ChatSocketReturn {
  id: string;
  users: string[];
}

export interface BlockChatSocketReturn {
  id: string;
  users: string[];
  blocked: boolean;
  blockedById: string | null;
}

export interface ChatSocketMessageReturn {
  id: string;
  users: string[];
  message: Message;
}

export interface GetMessagesQueryReturn {
  id: string;
  messages: Message[];
}
