import { ChatUser } from '../chats.interfaces';

export class ChatUserDto implements ChatUser {
  id: string;
  name: string;
  nickname: string;
  pictures: { avatar: string };

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.nickname = model.nickname;
    this.pictures = model.pictures;
  }
}
