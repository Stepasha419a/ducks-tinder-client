import { IUserDto } from '../users.interface';

export class UserDto {
  email;
  name;
  description;
  nickname;
  _id;
  isActivated;
  age;
  sex;
  interests;
  partnerSettings;
  pictures;
  chats;
  pairs;
  checkedUsers;

  constructor(model: IUserDto) {
    this.email = model.email;
    this.name = model.name;
    this.description = model.description;
    this.nickname = model.nickname;
    this._id = model._id;
    this.isActivated = model.isActivated;
    this.age = model.age;
    this.sex = model.sex;
    this.interests = model.interests;
    this.partnerSettings = model.partnerSettings;
    this.pictures = model.pictures;
    this.chats = model.chats;
    this.pairs = model.pairs;
    this.checkedUsers = model.checkedUsers;
  }
}
