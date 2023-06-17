import type { Picture, User } from '../User/User';

export interface Message {
  id: string;
  content: string;
  userId: string;
  username: string;
}

export interface Chat {
  id: string;
  messages: Message[];
  members: string[];
}

export interface ChatUser
  extends Pick<User, 'id' | 'pictures' | 'name' | 'nickname'> {
  pictures: Picture[];
  name: string;
  id: string;
  nickname: string;
}

export interface ChatWithUsers {
  id: string;
  messages: Message[];
  members: ChatUser[];
}
