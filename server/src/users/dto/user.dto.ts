import { User } from 'prisma';

export class UserDto {
  id;
  email;
  name;
  description;
  nickname;
  isActivated;
  age;
  sex;
  interests;
  pictures;
  place;
  distance;
  usersOnlyInDistance;
  preferSex;
  preferAgeFrom;
  preferAgeTo;

  constructor(model: User) {
    this.id = model.id;
    this.email = model.email;
    this.name = model.name;
    this.description = model.description;
    this.nickname = model.nickname;
    this.isActivated = model.isActivated;
    this.age = model.age;
    this.sex = model.sex;
    this.interests = model.interests;
    this.place = model.place;
    this.distance = model.distance;
    this.usersOnlyInDistance = model.usersOnlyInDistance;
    this.preferSex = model.preferSex;
    this.preferAgeFrom = model.preferAgeFrom;
    this.preferAgeTo = model.preferAgeTo;
    this.pictures = model.pictures;
  }
}
