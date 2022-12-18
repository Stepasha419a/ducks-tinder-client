import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxStore';
import { getUserPairsThunk } from '../../../redux/usersReducer';
import FailedPair from './Failed/FailedPair';
import PairBlock from './PairBlock/PairBlock';
import Loading from './Loading/Loading';

const Pair = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const firstPair = useAppSelector((state) => state.usersPage.pairs[0]);

  useEffect(() => {
    if (currentUser.pairs.length) {
      dispatch(getUserPairsThunk([currentUser.pairs[0]]));
    }
  }, [currentUser.pairs, dispatch]);

  if (!currentUser.pairs.length) {
    return <FailedPair />;
  }

  if (!firstPair) {
    return <Loading />;
  }

  return <PairBlock firstPair={firstPair}/>;
};

export default Pair;
