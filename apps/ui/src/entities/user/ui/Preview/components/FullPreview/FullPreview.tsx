import type { FC, ReactElement } from 'react';
import { useState } from 'react';
import { faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { ShortUser, User } from '@ducks-tinder-client/common';

import { InterestsListPopup } from '@entities/user';

import { InterestsList, LifestyleList, MoreAboutMeList } from './components';
import styles from './FullPreview.module.scss';

interface FullPreviewPropsInterface {
  user: User | ShortUser;
  extraContent?: ReactElement;
}

export const FullPreview: FC<FullPreviewPropsInterface> = ({
  user,
  extraContent,
}) => {
  const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] =
    useState(false);

  return (
    <div>
      <div className={styles.descr}>
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
