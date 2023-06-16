import { Message } from '../chats.interfaces';

export class MessageDto implements Message {
  id: string;
  text: string;
  userId: string;

  constructor(model) {
    this.id = model.id;
    this.text = model.text;
    this.userId = model.userId;
  }
}
