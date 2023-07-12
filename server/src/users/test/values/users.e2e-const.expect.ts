export const USERS_PAIRS_GET_EXPECT = [
  {
    id: 'users_pairs_get_second_user_id',
    name: 'Loren',
    description: null,
    distance: 31,
    interests: [],
    age: null,
    place: {
      name: 'second-user-place-name',
    },
    isActivated: false,
    pictures: [],
  },
];

export const USERS_PATCH_EXPECT = {
  id: 'patch_current_user_id',
  email: 'email123123@gmail.com',
  name: 'William',
  age: null,
  description: null,
  distance: null,
  isActivated: false,
  nickname: null,
  pairsCount: 0,
  place: {
    address: 'current-user-place-address',
    latitude: 12.3456789,
    longitude: 12.3456789,
    name: 'current-user-place-name',
  },
  preferAgeFrom: null,
  preferAgeTo: null,
  preferSex: null,
  usersOnlyInDistance: false,
  sex: null,
  pictures: [],
  interests: [{ name: 'traveling' }, { name: 'ski' }],
};

export const USERS_PICTURE_PUT_EXPECT = {
  id: 'users_picture_put_current_user_id',
  email: 'users_picture_put_current_user_id@gmail.com',
  name: 'Jason',
  age: null,
  description: null,
  distance: null,
  isActivated: false,
  nickname: null,
  pairsCount: 0,
  place: {
    address: 'current-user-place-address',
    latitude: 12.3456789,
    longitude: 12.3456789,
    name: 'current-user-place-name',
  },
  preferAgeFrom: null,
  preferAgeTo: null,
  preferSex: null,
  sex: null,
  usersOnlyInDistance: false,
  pictures: [],
  interests: [],
};

export const USERS_SORTED_GET_EXPECT = {
  id: 'sorted_second_user_id',
  age: 20,
  distance: 31,
  description: null,
  name: 'Loren',
  place: {
    name: 'second-user-place-name',
  },
  isActivated: false,
  pictures: [],
  interests: [],
};

export const USERS_PAIRS_PUT_EXPECT = {
  age: null,
  description: null,
  id: 'users_pairs_put_second_user_id',
  interests: [],
  isActivated: false,
  name: 'Loren',
  pictures: [],
  place: {
    name: 'second-user-place-name',
  },
};

export const USERS_PAIRS_POST_EXPECT = {
  age: null,
  description: null,
  id: 'users_pairs_post_second_user_id',
  interests: [],
  isActivated: false,
  name: 'Loren',
  pictures: [],
  place: {
    name: 'second-user-place-name',
  },
};

export const USERS_PICTURE_MIX_PUT_EXPECT = [
  { name: 'picture-name-8', order: 0 },
  { name: 'picture-name-1', order: 1 },
  { name: 'picture-name-2', order: 2 },
  { name: 'picture-name-5', order: 3 },
  { name: 'picture-name-6', order: 4 },
  { name: 'picture-name-4', order: 5 },
  { name: 'picture-name-7', order: 6 },
  { name: 'picture-name-0', order: 7 },
  { name: 'picture-name-3', order: 8 },
];
