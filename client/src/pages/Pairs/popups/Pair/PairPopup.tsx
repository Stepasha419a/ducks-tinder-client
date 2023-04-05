import type { FC } from 'react';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import type { User } from '../../../../shared/api/interfaces';
import { createChatThunk } from '../../../../redux/chat/chat.thunks';
import { deletePairThunk } from '../../../../redux/users/users.thunks';
import { InterestsListPopup } from '../../../../components/popups';
import { Preview } from '../../../../components/Preview/Preview';
import { Button, Popup } from '../../../../shared/ui';
import styles from './PairPopup.module.scss';

interface PairPopupProps {
  currentPair: User;
  setCurrentPair: (pair: User) => void;
}

const PairPopup: FC<PairPopupProps> = ({ currentPair, setCurrentPair }) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] =
    useState(false);

  const bottomElementRef = useRef<HTMLDivElement | null>(null);

  const interestsForLoop = [];

  for (let i = 0; i < 4; i++) {
    if (currentPair.interests[i]) interestsForLoop.push(currentPair.interests[i]);
  }

  const deletePair = (userId: string): void => {
    dispatch(
      deletePairThunk({ deleteForUserId: userId, userId: currentUser._id })
    );
  };

  const refuseHandler = (userId: string): void => {
    deletePair(userId);
    setCurrentPair({} as User);
  };

  const acceptHandler = (userId: string): void => {
    dispatch(
      createChatThunk({
        currentUserId: currentUser._id,
        otherUserId: currentPair._id,
      })
    );
    deletePair(userId);
    setCurrentPair({} as User);
  };

  return (
    <>
      <Popup
        closeHandler={() => setCurrentPair({} as User)}
        size="l"
        extraClassName={styles.overflow}
      >
        <Preview user={currentPair} isFull extraClassName={styles.padding} />
        <div className={styles.btns}>
          <Button
            onClick={() => refuseHandler(currentPair._id)}
            extraClassName={`${styles.btn} ${styles.border}`}
          >
            Refuse
          </Button>
          <Button
            onClick={() => acceptHandler(currentPair._id)}
            extraClassName={styles.btn}
          >
            Accept
          </Button>
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

export default PairPopup;
