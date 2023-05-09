import { MessageType } from '../chat.interfaces';

export class MessageDto implements MessageType {
  _id: string;
  content: string;
  user: string;

  constructor(model) {
    this._id = model._id;
    this.content = model.content;
    this.user = model.user;
  }
}
