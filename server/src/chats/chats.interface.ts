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

// new messages to notify inactive chats
export interface NewMessage {
  chatId: string;
  message: Message;
}
