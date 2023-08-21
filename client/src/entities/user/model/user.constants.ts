import type { PairSorts } from './user.interfaces';

export const INITIAL_SORTS: PairSorts = {
  distance: 100,
  age: { from: 18, to: 100 },
  photos: 1,
  interests: [],
  account: [],
};

export const INTERESTS_FOR_LOOP = ['music', 'travelling', 'movies', 'sport'];
