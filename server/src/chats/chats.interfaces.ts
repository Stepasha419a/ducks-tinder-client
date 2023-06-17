/* export interface MessageType {
  id: string;
  content: string;
  user: string;
}

export interface ChatUser {
  id: string;
  name: string;
  nickname: string;
  pictures: { avatar: string };
}

export interface ChatType {
  id: string;
  members: ChatUser[];
  messages: MessageType[];
}

export interface ISendMessage {
  username: string;
  content: string;
  userId: string;
} */

import { ShortUser } from 'users/users.interface';

export interface Message {
  id: string;
  text: string;
  userId: string;
}

// has all messages
export interface FullChat {
  id: string;
  users: ShortUser[];
  messages: Message[];
}

// has only latest message
export interface ShortChat {
  id: string;
  users: ShortUser[];
  messages: Message[];
}
