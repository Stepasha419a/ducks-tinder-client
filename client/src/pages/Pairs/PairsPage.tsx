import { useState } from 'react';
import { initialSorts, PairSorts } from '../../models/Sorts/Sorts';
import { Likes, Pairs, Sorting } from './components';

export const PairsPage = () => {
  const [sorts, setSorts] = useState<PairSorts>(initialSorts);

  return (
    <>
      <Likes />
      <Sorting setSorts={setSorts} />
      <Pairs sorts={sorts} />
    </>
  );
};
