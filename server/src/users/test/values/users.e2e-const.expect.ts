export const USERS_PAIRS_GET_EXPECT = [
  {
    id: 'users_pairs_get_second_user_id',
    name: 'Loren',
    description: null,
    distance: 31,
    interests: [],
    age: 21,
    place: {
      name: 'second-user-place-name',
    },
    isActivated: false,
    pictures: [],
    personalityType: null,
    zodiacSign: null,
    education: null,
    attentionSign: null,
    childrenAttitude: null,
    communicationStyle: null,
  },
];

export const USERS_PATCH_EXPECT = {
  id: 'patch_current_user_id',
  email: 'email123123@gmail.com',
  name: 'William',
  age: 20,
  description: null,
  distance: 50,
  isActivated: false,
  nickname: null,
  pairsCount: 0,
  place: {
    address: 'current-user-place-address',
    latitude: 12.3456789,
    longitude: 12.3456789,
    name: 'current-user-place-name',
  },
  preferAgeFrom: 18,
  preferAgeTo: 26,
  preferSex: 'female',
  sex: 'male',
  usersOnlyInDistance: false,
  pictures: [],
  interests: [],
  attentionSign: null,
  childrenAttitude: null,
  communicationStyle: null,
  education: null,
  personalityType: null,
  zodiacSign: null,
};

export const USERS_PATCH_RELATIONS_EXPECT = {
  id: 'patch_relations_current_user_id',
  email: 'patch_relations_current_user_id@gmail.com',
  name: 'Jason',
  age: 20,
  description: null,
  distance: 50,
  isActivated: false,
  nickname: null,
  pairsCount: 0,
  place: {
    address: 'current-user-place-address',
    latitude: 12.3456789,
    longitude: 12.3456789,
    name: 'current-user-place-name',
  },
  preferAgeFrom: 18,
  preferAgeTo: 26,
  preferSex: 'female',
  sex: 'male',
  usersOnlyInDistance: false,
  pictures: [],
  interests: [
    {
      name: 'interest-1',
    },
    {
      name: 'interest-2',
    },
  ],
  attentionSign: {
    name: 'attention-sign',
  },
  childrenAttitude: {
    name: 'children-attitude',
  },
  communicationStyle: {
    name: 'communication-style',
  },
  education: {
    name: 'education',
  },
  personalityType: {
    name: 'personality-type',
  },
  zodiacSign: {
    name: 'zodiac-sign',
  },
};

export const USERS_PICTURE_PUT_EXPECT = {
  id: 'users_picture_put_current_user_id',
  email: 'users_picture_put_current_user_id@gmail.com',
  name: 'Jason',
  age: 20,
  description: null,
  distance: 50,
  isActivated: false,
  nickname: null,
  pairsCount: 0,
  place: {
    address: 'current-user-place-address',
    latitude: 12.3456789,
    longitude: 12.3456789,
    name: 'current-user-place-name',
  },
  preferAgeFrom: 18,
  preferAgeTo: 26,
  preferSex: 'female',
  sex: 'male',
  usersOnlyInDistance: false,
  pictures: [],
  interests: [],
  attentionSign: null,
  childrenAttitude: null,
  communicationStyle: null,
  education: null,
  personalityType: null,
  zodiacSign: null,
};

export const USERS_SORTED_GET_EXPECT = {
  id: 'sorted_second_user_id',
  age: 20,
  distance: 30,
  description: null,
  name: 'Loren',
  place: {
    name: 'second-user-place-name',
  },
  isActivated: false,
  pictures: [],
  interests: [],
  personalityType: null,
  zodiacSign: null,
  education: null,
  attentionSign: null,
  childrenAttitude: null,
  communicationStyle: null,
};

export const USERS_RETURN_PUT_EXPECT = {
  id: 'users_return_put_current_user_id',
  age: 20,
  distance: 31,
  description: null,
  name: 'Jason',
  place: {
    name: 'current-user-place-name',
  },
  isActivated: false,
  pictures: [],
  interests: [],
  personalityType: null,
  zodiacSign: null,
  education: null,
  attentionSign: null,
  childrenAttitude: null,
  communicationStyle: null,
};

export const USERS_PAIRS_PUT_EXPECT = {
  age: 21,
  description: null,
  id: 'users_pairs_put_second_user_id',
  interests: [],
  isActivated: false,
  name: 'Loren',
  pictures: [],
  place: {
    name: 'second-user-place-name',
  },
  personalityType: null,
  zodiacSign: null,
  education: null,
  attentionSign: null,
  childrenAttitude: null,
  communicationStyle: null,
};

export const USERS_PAIRS_POST_EXPECT = {
  age: 21,
  description: null,
  id: 'users_pairs_post_second_user_id',
  interests: [],
  isActivated: false,
  name: 'Loren',
  pictures: [],
  place: {
    name: 'second-user-place-name',
  },
  personalityType: null,
  zodiacSign: null,
  education: null,
  attentionSign: null,
  childrenAttitude: null,
  communicationStyle: null,
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
