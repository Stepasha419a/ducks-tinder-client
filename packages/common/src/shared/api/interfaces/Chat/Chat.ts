export interface Chat {
  id: string;
  name: string;
  memberId: string;
  avatar: string;
  lastMessage?: Message;
  blocked: boolean;
  blockedById?: string;
  newMessagesCount: number;
  createdAt: string;
  updatedAt: string;
  lastSeenAt: string;
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

export interface ReceivedMessage extends Message {
  chatId: string;
}

export interface ReceivedNewMessage {
  message: ReceivedMessage;
  newMessagesCount: number;
}

export type ReceivedChatBlock = Pick<Chat, 'id' | 'blocked' | 'blockedById'>;
