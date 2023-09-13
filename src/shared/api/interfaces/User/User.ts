export type Range = { from: number; to: number };

export interface Picture {
  name: string;
  order: number;
}

export interface NameObject {
  name: string;
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
  age: number | null;
  sex: 'male' | 'female' | null;
  isActivated: boolean;

  interests: NameObject[];

  attentionSign: NameObject | null;
  childrenAttitude: NameObject | null;
  communicationStyle: NameObject | null;
  education: NameObject | null;
  personalityType: NameObject | null;
  zodiacSign: NameObject | null;

  alcoholAttitude: NameObject | null;
  chronotype: NameObject | null;
  foodPreference: NameObject | null;
  pet: NameObject | null;
  smokingAttitude: NameObject | null;
  socialNetworksActivity: NameObject | null;
  trainingAttitude: NameObject | null;

  place: Place | null;
  distance: number | null;
  usersOnlyInDistance: boolean;
  preferSex: 'male' | 'female' | null;
  preferAgeFrom: number | null;
  preferAgeTo: number | null;
  pictures: Picture[];
  firstPair?: { id: string; pictures: Picture[] };
  pairsCount: number;
}

export interface ShortUser extends ShortUserWithoutDistance {
  distance: number;
}

export interface ShortUserWithoutDistance {
  id: string;
  name: string;
  age: number;
  description: string;
  place: ShortPlace | null;
  isActivated: boolean;

  interests: NameObject[];

  attentionSign: NameObject | null;
  childrenAttitude: NameObject | null;
  communicationStyle: NameObject | null;
  education: NameObject | null;
  personalityType: NameObject | null;
  zodiacSign: NameObject | null;

  alcoholAttitude: NameObject | null;
  chronotype: NameObject | null;
  foodPreference: NameObject | null;
  pet: NameObject | null;
  smokingAttitude: NameObject | null;
  socialNetworksActivity: NameObject | null;
  trainingAttitude: NameObject | null;

  pictures: Picture[];
}

export interface PartialUser {
  email?: string;
  name?: string;
  description?: string;
  nickname?: string;
  age?: number;
  sex?: 'male' | 'female';
  isActivated?: boolean;
  distance?: number;
  usersOnlyInDistance?: boolean;
  preferSex?: 'male' | 'female';
  preferAgeFrom?: number;
  preferAgeTo?: number;
}

export interface PartialUserRelations {
  interests?: string[];
  attentionSign?: string | null;
  childrenAttitude?: string | null;
  communicationStyle?: string | null;
  education?: string | null;
  personalityType?: string | null;
  zodiacSign?: string | null;
}

export interface QuerySorts {
  distance: number;
  onlyNear: boolean;
  age: number;
  preferAgeFrom: number;
  preferAgeTo: number;
  sex: 'male' | 'female';
  preferSex: 'male' | 'female';
  userIds?: string[];
}

export type ChangedData = string | string[] | number | boolean;
