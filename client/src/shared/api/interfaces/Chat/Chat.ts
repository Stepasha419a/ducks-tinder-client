import type { ShortUser, ShortUserWithoutDistance } from '../User/User';

export interface RepliedMessage {
  id: string;
  text: string;
  userId: string;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  replied: RepliedMessage | null;
}

export interface Chat {
  id: string;
  messages: Message[];
  users: ShortUser[];
  messagesCount: number;
  blocked: boolean;
  blockedById: string;
}

export interface ShortChat {
  id: string;
  messages: Message[];
  users: ShortUserWithoutDistance[];
  blocked: boolean;
  blockedById: string;
}
