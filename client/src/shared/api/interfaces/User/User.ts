export type Range = { from: number; to: number };

export interface Picture {
  name: string;
  order: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  description: string;
  nickname: string;
  age: number;
  sex: 'male' | 'female';
  isActivated: boolean;
  interests: string[];
  place: string;
  distance: number;
  usersOnlyInDistance: boolean;
  preferSex: 'male' | 'female';
  preferAgeFrom: number;
  preferAgeTo: number;
  pictures: Picture[];
}

export interface ShortUser {
  id: string;
  name: string;
  age: number;
  description: string;
  distance: number;
  place: string;
  isActivated: boolean;
  interests: string[];
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
  place?: string;
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
