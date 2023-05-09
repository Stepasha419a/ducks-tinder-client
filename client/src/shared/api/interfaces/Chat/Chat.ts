import type { PicturesInterface, User } from '../User/User';

export interface Message {
  id: string;
  content: string;
  userId: string;
  username: string;
}

export interface Chat {
  _id: string;
  messages: Message[];
  members: string[];
}

export interface ChatUser
  extends Pick<User, '_id' | 'pictures' | 'name' | 'nickname'> {
  pictures: PicturesInterface;
  name: string;
  _id: string;
  nickname: string;
}

export interface ChatWithUsers {
  _id: string;
  messages: Message[];
  members: ChatUser[];
}
