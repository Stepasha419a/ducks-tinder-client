import { useEffect } from 'react';
import FailedPair from './Failed/FailedPair';
import PairBlock from './PairBlock/PairBlock';
import Loading from './Loading/Loading';
import { getUserPairsThunk } from '../../../../redux/users/users.thunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

const NavPair = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const firstPair = useAppSelector((state) => state.usersPage.pairs[0]);

  useEffect(() => {
    dispatch(getUserPairsThunk(currentUser.pairs));
  }, [dispatch, currentUser.pairs]);

  if (!currentUser.pairs.length) {
    return <FailedPair />;
  }

  if (!firstPair) {
    return <Loading />;
  }

  return <PairBlock firstPair={firstPair} />;
};

export default NavPair;
