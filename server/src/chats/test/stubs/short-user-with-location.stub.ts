import { ShortUserWithLocation } from 'users/users.interface';

export const shortUserWithLocationStub = (): ShortUserWithLocation => ({
  id: 'sdfhsdghj34259034578923',
  name: 'stepa',
  description: '',
  age: 18,
  interests: [],
  place: { name: 'russia moscow', latitude: 12.5456789, longitude: 12.5456789 },
  isActivated: false,
  pictures: [
    {
      name: '123.jpg',
      order: 0,
    },
  ],
});
