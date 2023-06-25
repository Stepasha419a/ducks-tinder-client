import type { ShortUser } from '../User/User';

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
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
