import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { User } from '../../../../models/User';
import { createChatThunk } from '../../../../redux/chat/chat.thunks';
import { deletePairThunk } from '../../../../redux/users/users.thunks';
import { ImageSlider } from '../../../ImagesSlider/ImageSlider';
import { Button, Popup } from '../../../ui';
import InterestsListPopup from '../Interests/List/InterestsListPopup';
import styles from './PairPopup.module.scss';

interface PairPopupProps {
  currentPair: User;
  setCurrentPair: (pair: User) => void;
}

const PairPopup: React.FC<PairPopupProps> = ({
  currentPair,
  setCurrentPair,
}) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] =
    useState(false);

  const bottomElementRef = useRef<HTMLDivElement | null>(null);

  const interestsForLoop = [];

  for (let i = 0; i < 4; i++) {
    currentPair.interests[i] && interestsForLoop.push(currentPair.interests[i]);
  }

  const scrollToBottom = () => {
    bottomElementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const deletePair = (userId: string) => {
    dispatch(
      deletePairThunk({ deleteForUserId: userId, userId: currentUser._id })
    );
  };

  const refuseHandler = (userId: string) => {
    deletePair(userId);
    setCurrentPair({} as User);
  };

  const acceptHandler = (userId: string) => {
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
        extraClassName={styles.overflow}
      >
        <div className={styles.slider}>
          <ImageSlider
            images={[
              currentPair.pictures.avatar,
              ...currentPair.pictures.gallery,
            ]}
            userId={currentPair._id}
          />
          <div className={styles.info}>
            <div className={styles.person}>
              <div className={styles.name}>{currentPair.name}</div>
              <div className={styles.years}>
                {currentPair.age || 'unknown years'}
              </div>
            </div>
            <div className={styles.distance}>
              {currentPair.partnerSettings?.distance || 'unknown'} km from you
            </div>
          </div>
        </div>
        <div onClick={() => scrollToBottom()} className={styles.scrollDown}>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <div className={styles.pair}>
          <div className={styles.wrapper}>
            <div className={styles.name}>{currentPair.name}</div>
            <div className={styles.years}>
              {currentPair.age || 'unkown years'}
            </div>
          </div>
          <div className={styles.sex}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            {currentPair.sex[0].toUpperCase() + currentPair.sex.slice(1) ||
              'unkown sex'}
          </div>
        </div>
        <hr className={styles.separator} />
        <div className={styles.description}>{currentPair.description}</div>
        <hr className={styles.separator} />
        <div className={styles.interests}>
          <div className={styles.title}>Interests</div>
          <div className={styles.items}>
            {interestsForLoop.map((item) => {
              return (
                <div key={item} className={styles.item}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div
          onClick={() => setIsInterestsListPopupOpen(true)}
          className={styles.showAll}
        >
          Show all
        </div>
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
