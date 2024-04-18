import type { PaginationParams } from '@/shared/lib/interfaces';
import type { FullPicture } from '../../interfaces';

export interface PartialUser {
  email?: string;
  name?: string;
  description?: string;
  nickname?: string;
  age?: number;
  sex?: 'male' | 'female';
  distance?: number;
  usersOnlyInDistance?: boolean;
  preferSex?: 'male' | 'female';
  preferAgeFrom?: number;
  preferAgeTo?: number;
  interests?: string[];
  zodiacSign?: string;
  education?: string;
  childrenAttitude?: string;
  personalityType?: string;
  communicationStyle?: string;
  attentionSign?: string;
  alcoholAttitude?: string;
  chronotype?: string;
  foodPreference?: string;
  pet?: string;
  smokingAttitude?: string;
  socialNetworksActivity?: string;
  trainingAttitude?: string;
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

export interface PairFilterParams extends PaginationParams {
  distance?: number;
  ageFrom?: number;
  ageTo?: number;
  pictures?: number;
  interests?: string[];
  hasInterests?: boolean;
  identifyConfirmed?: boolean;
}

export type ChangedData = string | string[] | number | boolean;

export interface PairsInfo {
  count: number;
  picture: FullPicture | null;
}
