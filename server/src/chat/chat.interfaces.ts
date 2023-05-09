export interface MessageType {
  _id: string;
  content: string;
  user: string;
}

export interface ChatUser {
  _id: string;
  name: string;
  nickname: string;
  pictures: { avatar: string };
}

export interface ChatType {
  _id: string;
  members: ChatUser[];
  messages: MessageType[];
}

export interface ISendMessage {
  username: string;
  content: string;
  userId: string;
}
