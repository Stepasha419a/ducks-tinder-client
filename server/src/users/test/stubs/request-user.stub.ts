import { NotValidatedUserDto, ValidatedUserDto } from 'users/dto';
import { userDtoStub } from './user-dto.stub';

export const requestUserStub = (): ValidatedUserDto & NotValidatedUserDto => {
  const userStubObj = userDtoStub();

  return {
    id: 'sdfhsdghj34259034578923',
    age: userStubObj.age,
    description: userStubObj.description,
    distance: userStubObj.distance,
    email: userStubObj.email,
    isActivated: userStubObj.isActivated,
    name: userStubObj.name,
    nickname: userStubObj.nickname,
    sex: userStubObj.sex,
    preferAgeFrom: userStubObj.preferAgeFrom,
    preferAgeTo: userStubObj.preferAgeTo,
    usersOnlyInDistance: userStubObj.usersOnlyInDistance,
    preferSex: userStubObj.preferSex,
    place: {
      name: 'place-name',
      address: 'place-address',
      latitude: 12.3456789,
      longitude: 12.3456789,
    },
    interests: [{ name: 'interest-1' }, { name: 'interest-2' }],
    zodiacSign: 'zodiac-sign',
    education: 'education',
    childrenAttitude: 'children-attitude',
    personalityType: 'personality-type',
    communicationStyle: 'communication-style',
    attentionSign: 'attention-sign',
    pictures: [{ name: 'picture.jpg', order: 0 }],
    firstPair: undefined,
    pairsCount: 0,
  };
};
