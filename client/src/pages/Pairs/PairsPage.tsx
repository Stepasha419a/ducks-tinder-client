import type { FC, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import type { PairSorts } from '@shared/api/interfaces';
import { INITIAL_SORTS } from '@shared/constants';
import { SortPairs } from '@features/user';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getUserPairsThunk } from '@entities/user/model';
import { Nav, Pairs } from '@widgets';
import { WithAuthRedirect } from '@entities/auth/hocs';
import { Likes } from './components/Likes/Likes';
import styles from './PairsPage.module.scss';

const PairsPage: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const pairIds = useAppSelector((state) => state.user.currentUser.pairs);

  const [sorts, setSorts] = useState<PairSorts>(INITIAL_SORTS);

  useEffect(() => {
    dispatch(getUserPairsThunk());
  }, [dispatch, pairIds]);

  return (
    <div className={styles.main}>
      <Nav />
      <div className={styles.content}>
        <Likes value={pairIds.length} />
        <SortPairs setSorts={setSorts} />
        <Pairs sorts={sorts} />
      </div>
    </div>
  );
};

export default WithAuthRedirect(PairsPage);
