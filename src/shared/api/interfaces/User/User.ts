import type {
  ALCOHOL_ATTITUDES,
  ATTENTION_SIGNS,
  CHILDREN_ATTITUDES,
  CHRONOTYPES,
  COMMUNICATION_STYLES,
  EDUCATIONS,
  FOOD_PREFERENCES,
  INTERESTS,
  PERSONAL_TYPES,
  PETS,
  SMOKING_ATTITUDES,
  SOCIAL_NETWORK_ACTIVITIES,
  TRAINING_ATTITUDES,
  ZODIAC_SIGNS,
} from '../../constant';

export type Range = { from: number; to: number };

export interface Picture {
  id: string;
  name: string;
  order: number;
}

export interface FullPicture {
  id: string;
  name: string;
  order: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Place {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface ShortPlace {
  name: string;
}

type OneOfOrNull<A extends ReadonlyArray<unknown>> = A[number] | null;

export interface User {
  id: string;
  email: string;
  name: string;
  description: string | null;
  nickname: string | null;
  isActivated: boolean;
  age: number | null;
  sex: string | null;
  distance: number | null;
  usersOnlyInDistance: boolean;
  preferSex: string | null;
  preferAgeFrom: number | null;
  preferAgeTo: number | null;

  interests: (typeof INTERESTS)[number][];
  zodiacSign: OneOfOrNull<typeof ZODIAC_SIGNS>;
  education: OneOfOrNull<typeof EDUCATIONS>;
  alcoholAttitude: OneOfOrNull<typeof ALCOHOL_ATTITUDES>;
  chronotype: OneOfOrNull<typeof CHRONOTYPES>;
  foodPreference: OneOfOrNull<typeof FOOD_PREFERENCES>;
  pet: OneOfOrNull<typeof PETS>;
  smokingAttitude: OneOfOrNull<typeof SMOKING_ATTITUDES>;
  socialNetworksActivity: OneOfOrNull<typeof SOCIAL_NETWORK_ACTIVITIES>;
  trainingAttitude: OneOfOrNull<typeof TRAINING_ATTITUDES>;
  childrenAttitude: OneOfOrNull<typeof CHILDREN_ATTITUDES>;
  personalityType: OneOfOrNull<typeof PERSONAL_TYPES>;
  communicationStyle: OneOfOrNull<typeof COMMUNICATION_STYLES>;
  attentionSign: OneOfOrNull<typeof ATTENTION_SIGNS>;

  place: Place | null;

  pictures: Picture[];
}

export interface ShortUser
  extends Pick<
    User,
    | 'id'
    | 'name'
    | 'age'
    | 'description'
    | 'isActivated'
    | 'distance'
    | 'interests'
    | 'zodiacSign'
    | 'education'
    | 'alcoholAttitude'
    | 'childrenAttitude'
    | 'chronotype'
    | 'communicationStyle'
    | 'attentionSign'
    | 'foodPreference'
    | 'personalityType'
    | 'pet'
    | 'pictures'
    | 'smokingAttitude'
    | 'socialNetworksActivity'
    | 'trainingAttitude'
  > {
  place: ShortPlace | null;
}

export interface ShortUserWithoutDistance extends Omit<ShortUser, 'distance'> {
  distance: never;
}
