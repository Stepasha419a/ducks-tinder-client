import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import type { PairSorts } from '@shared/api/interfaces';
import { INITIAL_SORTS } from '@shared/constants';
import { SortPairs } from '@features/user';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getUserPairsThunk } from '@entities/user/model';
import { Likes } from './components/Likes/Likes';
import { Pairs } from '@widgets';

export const PairsPage = (): ReactElement => {
  const dispatch = useAppDispatch();

  const pairIds = useAppSelector((state) => state.user.currentUser.pairs);

  const [sorts, setSorts] = useState<PairSorts>(INITIAL_SORTS);

  useEffect(() => {
    dispatch(getUserPairsThunk());
  }, [dispatch, pairIds]);

  return (
    <>
      <Likes value={pairIds.length} />
      <SortPairs setSorts={setSorts} />
      <Pairs sorts={sorts} />
    </>
  );
};
