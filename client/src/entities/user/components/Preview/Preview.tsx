import type { FC, ReactElement } from 'react';
import { useState } from 'react';
import {
  faCircleDown,
  faCircleInfo,
  faHouse,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { PreviewUser } from '@entities/user/model';
import type { ShortUser } from '@shared/api/interfaces';
import { ImageSlider } from '@shared/ui';
import { Button } from '@shared/ui';
import { InterestsListPopup } from '../InterestsListPopup/InterestsListPopup';
import styles from './Preview.module.scss';
import { InterestsList, MoreAboutMeList } from './components';

interface PreviewPropsInterface {
  user: PreviewUser | ShortUser;
  setIsFullPreview?: (setting: boolean) => void;
  isFull?: boolean;
  isShadow?: boolean;
  extraContent?: ReactElement;
  extraClassName?: string;
}

export const Preview: FC<PreviewPropsInterface> = ({
  user,
  setIsFullPreview = null,
  isFull = false,
  isShadow = false,
  extraContent,
  extraClassName,
}) => {
  const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] =
    useState(false);

  const cn = classNames(styles.preview, extraClassName, isFull && styles.full);

  return (
    <div className={cn}>
      <div className={classNames(styles.slider)}>
        <ImageSlider
          images={user.pictures}
          userId={user.id}
          extraClassName={styles.image}
          isShadow={isShadow}
        />
        {isFull && setIsFullPreview && (
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
        <div className={styles.distance}>
          <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
          {user.distance ?? 'unknown distance'}
          <span className={styles.text}>km from you</span>
        </div>
        {!isFull && setIsFullPreview && (
          <div className={styles.buttonWrapper}>
            <Button
              variant="mark"
              onClick={() => setIsFullPreview(true)}
              extraClassName={styles.openFullPreview}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
            </Button>
          </div>
        )}
      </div>
      {isFull && (
        <>
          {user.description && (
            <>
              <hr className={styles.separator} />
              <div className={styles.description}>{user.description}</div>
            </>
          )}
          <InterestsList
            interests={user.interests}
            handleShowAll={() => setIsInterestsListPopupOpen(true)}
          />
          <MoreAboutMeList user={user} />
          {extraContent && extraContent}

          {isInterestsListPopupOpen && (
            <InterestsListPopup
              interestsList={user.interests}
              setIsInterestsListPopupOpen={setIsInterestsListPopupOpen}
            />
          )}
        </>
      )}
    </div>
  );
};
