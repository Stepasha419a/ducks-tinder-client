import { ShortUser } from 'users/users.interface';

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

// has all messages
export interface FullChat {
  id: string;
  users: ShortUser[];
  messages: Message[];
  messagesCount: number;
}

// has only latest message
export interface ShortChat {
  id: string;
  users: ShortUser[];
  messages: Message[];
}
