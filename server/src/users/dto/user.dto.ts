import { User } from 'prisma';
import { UsersMapper } from '../users.mapper';

export class UserDto {
  id;
  email;
  name;
  description;
  nickname;
  isActivated;
  age;
  sex;
  place;
  distance;
  usersOnlyInDistance;
  preferSex;
  preferAgeFrom;
  preferAgeTo;
  interests;
  pictures;

  constructor(model: User) {
    this.id = model.id;
    this.email = model.email;
    this.name = model.name;
    this.description = model.description;
    this.nickname = model.nickname;
    this.isActivated = model.isActivated;
    this.age = model.age;
    this.sex = model.sex;
    this.place = model.place;
    this.distance = model.distance;
    this.usersOnlyInDistance = model.usersOnlyInDistance;
    this.preferSex = model.preferSex;
    this.preferAgeFrom = model.preferAgeFrom;
    this.preferAgeTo = model.preferAgeTo;
    this.interests = UsersMapper.mapInterests(model.userToInterests);
    this.pictures = model.pictures;
  }
}
