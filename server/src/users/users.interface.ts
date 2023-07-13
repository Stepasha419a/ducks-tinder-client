import { User } from '@prisma/client';

export interface PictureInterface {
  name: string;
  order: number;
}

interface Interest {
  name: string;
}

interface PlaceName {
  name: string;
}

export interface FullUser extends User {
  pairsCount: number;
}

interface OwnPlace extends PlaceName {
  address: string;
  latitude: number;
  longitude: number;
}

export interface AuthorizedUser extends User {
  place: OwnPlace;
}

export interface ShortUserWithoutDistance {
  id: string;
  name: string;
  age: number;
  description: string;
  isActivated: boolean;
  interests: Interest[];
  place: PlaceName;
  pictures: PictureInterface[];
}

interface ShortUserLocationPlace extends PlaceName {
  latitude: number;
  longitude: number;
}

export interface ShortUserWithLocation extends ShortUserWithoutDistance {
  place: ShortUserLocationPlace;
}

export interface ShortUser extends ShortUserWithoutDistance {
  distance: number;
}
