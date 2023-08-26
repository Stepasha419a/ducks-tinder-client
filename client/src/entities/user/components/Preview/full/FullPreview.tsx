import type { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import { useState } from 'react';
import type { PreviewUser } from '@/entities/user/model';
import type { ShortUser } from '@/shared/api/interfaces';
import classNames from 'classnames';
import styles from './FullPreview.module.scss';
import { Button, ImageSlider } from '@/shared/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleDown,
  faHouse,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { InterestsList, MoreAboutMeList } from './components';
import { InterestsListPopup } from '../../InterestsListPopup/InterestsListPopup';

interface FullPreviewPropsInterface {
  user: PreviewUser | ShortUser;
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
        <ImageSlider
          images={user.pictures}
          userId={user.id}
          extraClassName={styles.image}
          /* isShadow={isShadow} */
        />
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
        <div className={styles.distance}>
          <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
          {user.distance ?? 'unknown distance'}
          <span className={styles.text}>km from you</span>
        </div>
      </div>
      {user.description && (
        <div className={styles.description}>{user.description}</div>
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
    </div>
  );
};
