export interface PictureInterface {
  name: string;
  order: number;
}

export interface Interest {
  name: string;
}

interface PlaceName {
  name: string;
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
