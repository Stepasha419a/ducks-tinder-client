import type { Dispatch, FC, SetStateAction } from 'react';
import classNames from 'classnames';

import type { ShortUser } from '@ducks-tinder-client/common';
import { Button, Popup } from '@ducks-tinder-client/ui';

import { acceptPairThunk, Preview, refusePairThunk } from '@entities/user';
import { useAppDispatch } from '@shared/lib';

import styles from './RatePairPopup.module.scss';

interface RatePairPopupProps {
  currentPair: ShortUser;
  setCurrentPair: Dispatch<SetStateAction<ShortUser | null>>;
}

export const RatePairPopup: FC<RatePairPopupProps> = ({
  currentPair,
  setCurrentPair,
}) => {
  const dispatch = useAppDispatch();

  const handleAccept = (): void => {
    dispatch(acceptPairThunk(currentPair.id));
    setCurrentPair(null);
  };

  const handleRefuse = (): void => {
    dispatch(refusePairThunk(currentPair.id));
    setCurrentPair(null);
  };

  return (
    <>
      <Popup
        closeHandler={() => setCurrentPair(null)}
        size="l"
        extraClassName={styles.overflow}
      >
        <Preview user={currentPair} isFull extraClassName={styles.preview} />
        <div className={styles.btns}>
          <Button
            onClick={handleAccept}
            extraClassName={classNames(styles.btn, styles.border)}
          >
            Accept
          </Button>
          <Button onClick={handleRefuse} extraClassName={styles.btn}>
            Refuse
          </Button>
        </div>
      </Popup>
    </>
  );
};
