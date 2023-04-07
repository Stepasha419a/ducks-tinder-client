import type { ReactElement } from 'react';
import { useEffect } from 'react';
import FailedPair from './Failed/FailedPair';
import PairBlock from './PairBlock/PairBlock';
import Loading from './Loading/Loading';
import { getUserPairsThunk } from '../../../../redux/users/users.thunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

const NavPair = (): ReactElement => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const firstPair = useAppSelector((state) => state.usersPage.pairs[0]);

  useEffect(() => {
    dispatch(getUserPairsThunk(currentUser.pairs));
  }, [dispatch, currentUser.pairs]);

  if (!currentUser.pairs.length) {
    return <FailedPair />;
  }

  if (!firstPair.name) {
    return <Loading />;
  }

  return <PairBlock firstPair={firstPair} />;
};

export default NavPair;
