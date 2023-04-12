import type { ReactElement } from 'react';
import { useEffect } from 'react';
import FailedPair from './Failed/FailedPair';
import PairBlock from './PairBlock/PairBlock';
import Loading from './Loading/Loading';
import { getUserPairsThunk } from '@entities/user/model';
import { useAppDispatch, useAppSelector } from '@hooks';

const NavPair = (): ReactElement => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const firstPair = useAppSelector((state) => state.user.pairs[0]);

  useEffect(() => {
    dispatch(getUserPairsThunk(currentUser.pairs));
  }, [dispatch, currentUser.pairs]);

  if (!currentUser.pairs.length) {
    return <FailedPair />;
  }

  // throws errors because firstPair on refresh it's just an empty {}
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!firstPair?.name) {
    return <Loading />;
  }

  return <PairBlock firstPair={firstPair} />;
};

export default NavPair;
