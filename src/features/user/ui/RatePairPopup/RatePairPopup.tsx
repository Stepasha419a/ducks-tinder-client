import classNames from 'classnames';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import { refusePairThunk, acceptPairThunk } from '@entities/user/model/pair';
import { InterestsListPopup, Preview } from '@entities/user/ui';
import type { ShortUser } from '@shared/api/interfaces';
import { useAppDispatch } from '@shared/lib/hooks';
import { Button, Popup } from '@shared/ui';
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

  const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] =
    useState(false);

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
        <Preview user={currentPair} isFull extraClassName={styles.padding} />
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
      {isInterestsListPopupOpen && (
        <InterestsListPopup
          interestsList={currentPair.interests}
          setIsInterestsListPopupOpen={setIsInterestsListPopupOpen}
        />
      )}
    </>
  );
};
