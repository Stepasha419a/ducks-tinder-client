import { User } from '@prisma/client';

export interface PictureInterface {
  name: string;
  order: number;
}

interface Interest {
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
  place: string;
  isActivated: boolean;
  interests: Interest[];
  pictures: PictureInterface[];
}

export interface UserToInterestsRelation {
  interest: {
    id: string;
    name: string;
  };
}
