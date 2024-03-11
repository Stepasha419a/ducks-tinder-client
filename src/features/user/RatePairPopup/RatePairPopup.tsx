import type { FC } from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { Button, Popup } from '@shared/ui';
import { setCurrentPair } from '@/entities/user/model/user/user.slice';
import { InterestsListPopup, Preview } from '@entities/user/components';
import styles from './RatePairPopup.module.scss';
import { refusePairThunk, acceptPairThunk } from '@/entities/user/model/user';
import classNames from 'classnames';

export const RatePairPopup: FC = () => {
  const dispatch = useAppDispatch();

  const currentPair = useAppSelector((state) => state.user.currentPair);

  const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] =
    useState(false);

  const handleAccept = (): void => {
    dispatch(acceptPairThunk());
  };

  const handleRefuse = (): void => {
    dispatch(refusePairThunk());
  };

  if (!currentPair) {
    return null;
  }

  return (
    <>
      <Popup
        closeHandler={() => dispatch(setCurrentPair(null))}
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
