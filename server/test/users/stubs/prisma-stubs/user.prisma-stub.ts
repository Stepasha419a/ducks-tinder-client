import { User } from '@prisma/client';

export const userPrismaStub = (): User => ({
  id: 'sdfhsdghj34259034578923',
  password: '123123123',
  email: '123@mail.ru',
  name: 'Jason',
  description: '',
  isActivated: false,
  age: 18,
  sex: 'male',
  nickname: '',
  place: '',
  distance: 2,
  usersOnlyInDistance: false,
  preferSex: 'female',
  preferAgeFrom: 18,
  preferAgeTo: 20,
  activationLink: '123123123',
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
});
