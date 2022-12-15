import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../../models/IUser';
import { AppStateType } from '../../../redux/reduxStore';
import { getUserThunk } from '../../../redux/usersReducer';
import FailedPair from './Failed/FailedPair';
import PairBlock from './PairBlock/PairBlock';

const Pair = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: AppStateType) => state.usersPage.currentUser
  );

  const [firstPair, setFirstPair] = useState<IUser>({} as IUser);

  useEffect(() => {
    if (currentUser.pairs.length) {
      const fetchUser = async (userId: string) => {
        const data = await dispatch(getUserThunk({ id: userId }) as any);
        return data.payload;
      };

      fetchUser(currentUser.pairs[0]).then((data) => setFirstPair(data));
    }
  }, [currentUser.pairs, dispatch]);

  if (!currentUser.pairs.length) {
    return <FailedPair />;
  }

  return <PairBlock firstPair={firstPair} />;
};

export default Pair;
