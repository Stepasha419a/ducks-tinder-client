import { UserDto } from '../../../src/users/dto/user.dto';

export const userStub = (): UserDto => ({
  id: 'sdfhsdghj34259034578923',
  email: '123@mail.ru',
  name: 'Jason',
  description: '',
  isActivated: false,
  age: 18,
  sex: 'male',
  nickname: '',
  interests: [{ id: '456456', name: 'programming' }],
  place: '',
  distance: 2,
  usersOnlyInDistance: false,
  preferSex: 'female',
  preferAgeFrom: 18,
  preferAgeTo: 20,
  pictures: [
    {
      id: '123123',
      name: '123.jpg',
      order: 0,
    },
    {
      id: '456456',
      name: '456.jpg',
      order: 1,
    },
  ],
  pairs: [],
  pairsCount: 0,
});
