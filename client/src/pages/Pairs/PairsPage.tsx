import { useState } from 'react';
import { PairSorts } from '../../models/User/User';
import { INITIAL_SORTS } from '../../shared/constants';
import { Likes, Pairs, Sorting } from './components';

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
