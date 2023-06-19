import { UserDto } from 'users/dto';

export const userDtoStub = (): UserDto => ({
  id: 'sdfhsdghj34259034578923',
  email: '123@mail.ru',
  name: 'Jason',
  description: '',
  isActivated: false,
  age: 18,
  sex: 'male',
  nickname: '',
  interests: [{ name: 'programming' }],
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
  firstPair: {
    id: '34545656',
    name: 'Janet',
    age: 23,
    description: null,
    distance: 80,
    interests: [],
    pictures: [],
  },
  pairsCount: 5,
});
