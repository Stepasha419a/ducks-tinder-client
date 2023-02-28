import {
  faCircleDown,
  faHouse,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { User } from '../../../../../models/User';
import { ImageSlider } from '../../../../ImagesSlider/ImageSlider';
import InterestsListPopup from '../../../../Pairs/popups/Interests/List/InterestsListPopup';
import { Button } from '../../../../ui';
import styles from './FullPreview.module.scss';

interface ProfileFullPreviewPropsInterface {
  currentUser: User;
  setIsFullPreviewPageSetting: (setting: boolean) => void;
}

const ProfileFullPreview: React.FC<ProfileFullPreviewPropsInterface> = ({
  currentUser,
  setIsFullPreviewPageSetting,
}) => {
  const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] =
    useState(false);

  const interestsForLoop = [];

  for (let i = 0; i < 4; i++) {
    currentUser.interests[i] && interestsForLoop.push(currentUser.interests[i]);
  }

  return (
    <div className={styles.preview}>
      <div className={styles.slider}>
        <ImageSlider
          images={[
            currentUser.pictures.avatar,
            ...currentUser.pictures.gallery,
          ]}
          userId={currentUser._id}
        />
        <Button
          variant="mark"
          onClick={() => setIsFullPreviewPageSetting(false)}
          extraClassName={styles.closeFullPreview}
        >
          <FontAwesomeIcon icon={faCircleDown} className={styles.icon} />
        </Button>
      </div>
      <div className={styles.info}>
        <div className={styles.descr}>
          <div className={styles.person}>
            {currentUser.name}{' '}
            <span className={styles.years}>{currentUser.age}</span>
          </div>
          <div className={styles.place}>
            <FontAwesomeIcon icon={faHouse} className={styles.icon} />
            <div>Lives in {currentUser.partnerSettings.place}</div>
          </div>
          <div className={styles.distance}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
            {currentUser.partnerSettings.distance}
            <span className={styles.text}>km from you</span>
          </div>
        </div>
      </div>
      <hr className={styles.separator} />
      <div className={styles.descr}>{currentUser.description}</div>
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

      {isInterestsListPopupOpen && (
        <InterestsListPopup
          interestsList={currentUser.interests}
          setIsInterestsListPopupOpen={setIsInterestsListPopupOpen}
        />
      )}
    </div>
  );
};

export default ProfileFullPreview;
