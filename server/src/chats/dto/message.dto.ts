import { MessageType } from '../chats.interfaces';

export class MessageDto implements MessageType {
  id: string;
  content: string;
  user: string;

  constructor(model) {
    this.id = model.id;
    this.content = model.content;
    this.user = model.user;
  }
}
