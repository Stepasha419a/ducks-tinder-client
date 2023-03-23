import { useState } from 'react';
import { Likes, Pairs, Sorting } from './components';
import { INITIAL_SORTS } from './constants';
import { PairSorts } from './interfaces';

export const PairsPage = () => {
  const [sorts, setSorts] = useState<PairSorts>(INITIAL_SORTS);

  return (
    <>
      <Likes />
      <Sorting setSorts={setSorts} />
      <Pairs sorts={sorts} />
    </>
  );
};
