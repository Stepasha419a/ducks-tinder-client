export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: Message;
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
  avatar: string;
  name: string;
  replied?: RepliedMessage;

  createdAt: string;
  updatedAt: string;
}

export interface RepliedMessage {
  id: string;
  name: string;
  text: string;
  userId: string;
}
