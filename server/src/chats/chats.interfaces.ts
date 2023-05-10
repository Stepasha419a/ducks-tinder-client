export interface MessageType {
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
}
