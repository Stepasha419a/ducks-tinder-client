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
  place;
  distance;
  usersOnlyInDistance;
  preferSex;
  preferAgeFrom;
  preferAgeTo;
  interests;
  zodiacSign;
  education;
  alcoholAttitude;
  chronotype;
  foodPreference;
  pet;
  smokingAttitude;
  socialNetworksActivity;
  trainingAttitude;
  childrenAttitude;
  personalityType;
  communicationStyle;
  attentionSign;
  pictures;
  firstPair;
  pairsCount;

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
    this.interests = model.interests;
    this.zodiacSign = model.zodiacSign;
    this.education = model.education;
    this.childrenAttitude = model.childrenAttitude;
    this.personalityType = model.personalityType;
    this.communicationStyle = model.communicationStyle;
    this.attentionSign = model.attentionSign;
    this.alcoholAttitude = model.alcoholAttitude;
    this.chronotype = model.chronotype;
    this.foodPreference = model.foodPreference;
    this.pet = model.pet;
    this.smokingAttitude = model.smokingAttitude;
    this.socialNetworksActivity = model.socialNetworksActivity;
    this.trainingAttitude = model.trainingAttitude;
    this.pictures = model.pictures;
    this.firstPair = model.pairs && model.pairs[0];
    this.pairsCount = model.pairsCount;
  }
}
