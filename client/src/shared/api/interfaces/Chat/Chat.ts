import type { ShortUser } from '../User/User';

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
}

export interface ShortChat {
  id: string;
  messages: Message[];
  users: ShortUser[];
}
