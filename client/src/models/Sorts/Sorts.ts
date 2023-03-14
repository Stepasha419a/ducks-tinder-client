import { PreferAge } from '../User/User';

export interface PairSorts {
  distance: number;
  age: PreferAge;
  photos: number;
  interests: string[];
  account: string[];
}

export const initialSorts = {
  distance: 100,
  age: { from: 18, to: 100 },
  photos: 1,
  interests: [],
  account: [],
};
