export type Range = { from: number; to: number };

export interface PartnerSettings {
  place: string;
  distance: number;
  usersOnlyInDistance: boolean;
  preferSex: 'male' | 'female';
  age: Range;
}

export interface PicturesInterface {
  avatar: string;
  gallery: string[];
}

export enum PicturesEnum {
  avatar = 'avatar',
  gallery = 'gallery',
}

export type PicturesVariants = keyof PicturesInterface;

export interface User {
  _id: string;
  email: string;
  name: string;
  description: string;
  nickname: string;
  age: number;
  sex: 'male' | 'female';
  isActivated: boolean;
  interests: string[];
  partnerSettings: PartnerSettings;
  pictures: PicturesInterface;
  chats: string[];
  pairs: string[];
  checkedUsers: string[];
}

interface PartialPartnerSettings {
  place?: string;
  distance?: number;
  usersOnlyInDistance?: boolean;
  preferSex?: 'male' | 'female';
  age?: {
    from?: number;
    to?: number;
  };
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
  pictures?: {
    avatar?: string;
    gallery?: string[];
  };
  partnerSettings?: PartialPartnerSettings;
  chats?: string[];
  checkedUsers?: string[];
}

export interface QuerySorts {
  distance: number;
  onlyNear: boolean;
  age: number;
  preferAge: Range;
  sex: 'male' | 'female';
  preferSex: 'male' | 'female';
  userIds?: string[];
}

export type ChangedData = string | number | boolean | string[] | Range;

export type InnerObjectName = 'partnerSettings' | null;
