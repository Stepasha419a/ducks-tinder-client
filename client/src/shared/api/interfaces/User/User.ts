export type Range = { from: number; to: number };

export interface Picture {
  name: string;
  order: number;
}

export interface Interest {
  name: string;
}

interface Place {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface ShortPlace {
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
  interests: Interest[];
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

export interface ShortUser {
  id: string;
  name: string;
  age: number;
  description: string;
  distance: number;
  place: ShortPlace | null;
  isActivated: boolean;
  interests: Interest[];
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
  interests?: string[];
  distance?: number;
  usersOnlyInDistance?: boolean;
  preferSex?: 'male' | 'female';
  preferAgeFrom?: number;
  preferAgeTo?: number;
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

export type InnerObjectName = 'partnerSettings' | null;
