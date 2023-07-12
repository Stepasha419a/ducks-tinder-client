import { userDtoStub } from 'users/test/stubs';
import { AuthorizedUser } from 'users/users.interface';

export const requestUserStub = (): AuthorizedUser => {
  const userStubObj = userDtoStub();

  return {
    id: 'sdfhsdghj34259034578923',
    password: '123123123',
    activationLink: 'asdasd',
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
    createdAt: new Date('2022-08-19'),
    updatedAt: new Date('2022-08-20'),
  };
};
