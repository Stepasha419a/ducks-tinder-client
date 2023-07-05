import { User } from '@prisma/client';
import { userDtoStub } from 'users/test/stubs';

export const requestUserStub = (): User => {
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
    createdAt: new Date('2022-08-19'),
    updatedAt: new Date('2022-08-20'),
  };
};