export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: ShortMessage;
  chatVisit?: LastSeen;
  blocked: boolean;
  blockedById?: string;
}

export interface LastSeen {
  userId: string;
  chatId: string;
  lastSeen: string;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  replied?: RepliedMessage;

  createdAt: string;
  updatedAt: string;
}

export interface RepliedMessage {
  id: string;
  text: string;
  userId: string;
}

export interface ShortMessage {
  id: string;
  text: string;
  userId: string;

  createdAt: string;
  updatedAt: string;
}
