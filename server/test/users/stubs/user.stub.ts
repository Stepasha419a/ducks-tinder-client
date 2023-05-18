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
  interests: [],
  place: '',
  distance: 2,
  usersOnlyInDistance: false,
  preferSex: 'female',
  preferAgeFrom: 18,
  preferAgeTo: 20,
  pictures: [
    {
      name: '123.jpg',
      order: 0,
    },
  ],
  pairs: [],
  pairsCount: 0,
});
