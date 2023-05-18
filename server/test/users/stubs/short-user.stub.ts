import { ShortUser } from 'users/users.interface';

export const shortUserStub = (): ShortUser => ({
  id: 'sdfhsdghj34259034578923',
  name: 'stepa',
  description: '',
  age: 18,
  interests: [],
  distance: 2,
  pictures: [
    {
      name: '123.jpg',
      order: 0,
    },
  ],
});
