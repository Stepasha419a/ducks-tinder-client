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
