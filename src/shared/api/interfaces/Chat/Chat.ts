import type { ShortUser, ShortUserWithoutDistance } from "../User/User";

export interface RepliedMessage {
  id: string;
  text: string;
  userId: string;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  replied: RepliedMessage | null;
}

export interface LastSeen {
  lastSeen: string;
}

export interface Chat {
  id: string;
  messages: Message[];
  users: ShortUser[];
  messagesCount: number;
  blocked: boolean;
  blockedById: string;
  chatVisits: LastSeen[];
}

export interface ShortChat {
  id: string;
  messages: Message[];
  users: ShortUserWithoutDistance[];
  blocked: boolean;
  blockedById: string;
  chatVisits: LastSeen[];
}
