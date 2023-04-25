import type { FC } from 'react';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { InterestsListPopup } from '@components';
import { Popup } from '@shared/ui';
import { setCurrentPair } from '@entities/user/model/user.slice';
import { Preview } from '@entities/user/components';
import { AcceptPair } from '../AcceptPair/AcceptPair';
import { RefusePair } from '../RefusePair/RefusePair';
import styles from './RatePairPopup.module.scss';

export const RatePairPopup: FC = () => {
  const dispatch = useAppDispatch();

  const currentPair = useAppSelector((state) => state.user.currentPair)!;

  const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] =
    useState(false);

  const bottomElementRef = useRef<HTMLDivElement | null>(null);

  const interestsForLoop = [];

  for (let i = 0; i < 4; i++) {
    if (currentPair.interests[i])
      interestsForLoop.push(currentPair.interests[i]);
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
          <AcceptPair />
          <RefusePair />
        </div>
        <div ref={bottomElementRef} />
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
