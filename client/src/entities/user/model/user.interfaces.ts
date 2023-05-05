import type { PicturesVariants, Range } from '@shared/api/interfaces';

export interface ImageInterface {
  id: number;
  image: string;
  setting: PicturesVariants;
}

export interface PairSorts {
  distance: number;
  age: Range;
  photos: number;
  interests: string[];
  account: string[];
}

export type PairSortsKey = keyof PairSorts;
