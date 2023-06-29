import { User } from '@prisma/client';

export interface PictureInterface {
  name: string;
  order: number;
}

interface Interest {
  name: string;
}

interface Place {
  name: string;
}

export interface FullUser extends User {
  pairsCount: number;
}

export interface ShortUser {
  id: string;
  name: string;
  age: number;
  description: string;
  distance: number;
  isActivated: boolean;
  interests: Interest[];
  place: Place;
  pictures: PictureInterface[];
}

export interface UserToInterestsRelation {
  interest: {
    id: string;
    name: string;
  };
}
