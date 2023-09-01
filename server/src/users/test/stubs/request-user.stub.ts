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
    zodiacSign: { name: 'zodiac-sign' },
    education: { name: 'education' },
    childrenAttitude: { name: 'children-attitude' },
    personalityType: { name: 'personality-type' },
    communicationStyle: { name: 'communication-style' },
    attentionSign: { name: 'attention-sign' },
    alcoholAttitude: { name: 'alcohol-attitude' },
    chronotype: { name: 'chronotype' },
    foodPreference: { name: 'food-preference' },
    pet: { name: 'pet' },
    smokingAttitude: { name: 'smoking-attitude' },
    socialNetworksActivity: { name: 'social-networks-activity' },
    trainingAttitude: { name: 'training-attitude' },
    pictures: [{ name: 'picture.jpg', order: 0 }],
    firstPair: undefined,
    pairsCount: 0,
  };
};
