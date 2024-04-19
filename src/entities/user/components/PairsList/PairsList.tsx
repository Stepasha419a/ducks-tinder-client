import type { Dispatch, FC, SetStateAction } from 'react';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
} from '@shared/lib/hooks';
import type { ShortUser } from '@shared/api/interfaces';
import { getUserPairsThunk } from '@/entities/user/model/pair';
import Pair from './Pair/Pair';
import styles from './PairsList.module.scss';
import { PairsListLazy } from './PairsList.lazy';
import { InfinityScroll, Skeleton } from '@/shared/ui';

interface PairsListProps {
  setCurrentPair: Dispatch<SetStateAction<ShortUser | null>>;
}

export const PairsList: FC<PairsListProps> = ({ setCurrentPair }) => {
  const dispatch = useAppDispatch();

  const pairs = useAppSelector((state) => state.pair.pairs);
  const isPairsLoading = useAppSelector((state) => state.pair.isPairsLoading);
  const isPairsEnded = useAppSelector((state) => state.pair.isPairsEnded);

  const listRef = useRef(null);

  const delayedGetUserPairs = useDebouncedCallback(() => {
    dispatch(getUserPairsThunk({ isInitial: false }));
  });

  if (!pairs.length && isPairsEnded) {
    return (
      <div className={styles.noPairs}>
        <FontAwesomeIcon icon={faHeart} className={styles.icon} />
        <div>You don't have likes. Like someone to have a like too</div>
      </div>
    );
  }

  return (
    <div className={styles.pairs} ref={listRef}>
      <InfinityScroll
        handleLoadMore={delayedGetUserPairs}
        isLoading={isPairsLoading}
        isMore={!isPairsEnded}
        listRef={listRef}
        loader={<Skeleton count={1} width={244} height={305} duration={1} />}
      >
        {pairs.map((user: ShortUser) => {
          return (
            <Pair
              key={user.id}
              user={user}
              setCurrentPair={() => setCurrentPair(user)}
            />
          );
        })}
      </InfinityScroll>
      {!isPairsEnded && <PairsListLazy />}
    </div>
  );
};
