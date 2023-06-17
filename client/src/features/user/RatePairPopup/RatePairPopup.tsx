import type { FC } from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { Button, Popup } from '@shared/ui';
import { setCurrentPair } from '@entities/user/model/user.slice';
import { InterestsListPopup, Preview } from '@entities/user/components';
import styles from './RatePairPopup.module.scss';
import { deletePairThunk } from '@/entities/user/model';

export const RatePairPopup: FC = () => {
  const dispatch = useAppDispatch();

  const currentPair = useAppSelector((state) => state.user.currentPair)!;

  const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] =
    useState(false);

  const handleAccept = (): void => {
    dispatch(deletePairThunk());
  };

  const handleRefuse = (): void => {
    dispatch(deletePairThunk());
  };

  return (
    <>
      <Popup
        closeHandler={() => dispatch(setCurrentPair(null))}
        size="l"
        extraClassName={styles.overflow}
      >
        <Preview user={currentPair} isFull extraClassName={styles.padding} />
        <div className={styles.btns}>
          <Button onClick={handleAccept} extraClassName={styles.btn}>
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
