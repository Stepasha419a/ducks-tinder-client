import type { ReactElement } from 'react';
import { useState } from 'react';
import type { PairSorts } from '@shared/api/interfaces';
import { INITIAL_SORTS } from '@shared/constants';
import { Likes, Pairs, Sorting } from './components';

export const PairsPage = (): ReactElement => {
  const [sorts, setSorts] = useState<PairSorts>(INITIAL_SORTS);

  return (
    <>
      <Likes />
      <Sorting setSorts={setSorts} />
      <Pairs sorts={sorts} />
    </>
  );
};
