import { ChatUser } from '../chat.interfaces';

export class ChatUserDto implements ChatUser {
  _id: string;
  name: string;
  nickname: string;
  pictures: { avatar: string };

  constructor(model) {
    this._id = model._id;
    this.name = model.name;
    this.nickname = model.nickname;
    this.pictures = model.pictures;
  }
}
