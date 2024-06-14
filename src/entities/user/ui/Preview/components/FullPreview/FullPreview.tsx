import {
  faCircleDown,
  faHouse,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import { useState } from 'react';
import { InterestsListPopup } from '@entities/user';
import type { ShortUser, User } from '@shared/api/interfaces';
import { Button, ImageSlider } from '@shared/ui';
import { InterestsList, LifestyleList, MoreAboutMeList } from './components';
import styles from './FullPreview.module.scss';

interface FullPreviewPropsInterface {
  user: User | ShortUser;
  setIsFullPreview?: Dispatch<SetStateAction<boolean>>;
  extraContent?: ReactElement;
  extraClassName?: string;
}

export const FullPreview: FC<FullPreviewPropsInterface> = ({
  user,
  setIsFullPreview,
  extraContent,
  extraClassName,
}) => {
  const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] =
    useState(false);

  const cn = classNames(styles.preview, extraClassName);

  return (
    <div className={cn}>
      <div className={styles.slider}>
        <ImageSlider images={user.pictures} extraClassName={styles.image} />
        {setIsFullPreview && (
          <Button
            variant="mark"
            onClick={() => setIsFullPreview(false)}
            extraClassName={styles.closeFullPreview}
          >
            <FontAwesomeIcon icon={faCircleDown} className={styles.icon} />
          </Button>
        )}
      </div>
      <div
        onClick={() => setIsFullPreview && setIsFullPreview(true)}
        className={styles.descr}
      >
        <div className={styles.person}>
          {user.name} <span className={styles.years}>{user.age}</span>
        </div>
        <div className={styles.place}>
          <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          <span className={styles.name}>
            Lives in&nbsp;
            {user.place?.name || 'unknown place'}
          </span>
        </div>
        {user.distance !== null && (
          <div className={styles.distance}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
            <span className={styles.text}>{user.distance} km from you</span>
          </div>
        )}
      </div>
      {user.description && (
        <div className={styles.description}>{user.description}</div>
      )}
      <InterestsList
        interests={user.interests}
        handleShowAll={() => setIsInterestsListPopupOpen(true)}
      />
      <MoreAboutMeList user={user} />
      <LifestyleList user={user} />
      {extraContent && extraContent}

      {isInterestsListPopupOpen && (
        <InterestsListPopup
          interestsList={user.interests}
          setIsInterestsListPopupOpen={setIsInterestsListPopupOpen}
        />
      )}
    </div>
  );
};
