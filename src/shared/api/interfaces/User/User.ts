export type Range = { from: number; to: number };

export interface Picture {
  id: string;
  name: string;
  order: number;
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

  interests: string[];
  zodiacSign: string | null;
  education: string | null;
  alcoholAttitude: string | null;
  chronotype: string | null;
  foodPreference: string | null;
  pet: string | null;
  smokingAttitude: string | null;
  socialNetworksActivity: string | null;
  trainingAttitude: string | null;
  childrenAttitude: string | null;
  personalityType: string | null;
  communicationStyle: string | null;
  attentionSign: string | null;

  place: Place | null;

  pictures: Picture[];
}

export interface ShortUser {
  id: string;
  name: string;
  age: number | null;
  description: string | null;
  isActivated: boolean;

  distance: number | null;
  interests: string[];
  zodiacSign: string | null;
  education: string | null;
  alcoholAttitude: string | null;
  chronotype: string | null;
  foodPreference: string | null;
  pet: string | null;
  smokingAttitude: string | null;
  socialNetworksActivity: string | null;
  trainingAttitude: string | null;
  childrenAttitude: string | null;
  personalityType: string | null;
  communicationStyle: string | null;
  attentionSign: string | null;

  place: ShortPlace | null;

  pictures: Picture[];
}

export interface ShortUserWithoutDistance extends Omit<ShortUser, 'distance'> {
  distance: never;
}
