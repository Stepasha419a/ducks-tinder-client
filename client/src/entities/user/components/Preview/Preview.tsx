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
import type { ShortUser, User } from '@shared/api/interfaces';
import { ImageSlider } from '@shared/ui';
import { Button, ListItem } from '@shared/ui';
import { InterestsListPopup } from '../InterestsListPopup/InterestsListPopup';
import styles from './Preview.module.scss';

interface PreviewPropsInterface {
  user: User | ShortUser;
  setIsFullPreview?: (setting: boolean) => void;
  isFull?: boolean;
  isShadow?: boolean;
  extraContent?: ReactElement;
  extraClassName?: string;
}

// TODO: make correct props data (which participates in the code)
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

  const interestsForLoop = [];

  for (let i = 0; i < 4; i++) {
    if (user.interests[i]) interestsForLoop.push(user.interests[i]);
  }

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
          {user.distance || 'unknown distance'}
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
          {interestsForLoop.length > 0 && (
            <>
              <hr className={styles.separator} />

              <div className={styles.interests}>
                <div className={styles.title}>Interests</div>
                <div className={styles.items}>
                  {interestsForLoop.map((item) => {
                    return <ListItem key={item.name}>{item.name}</ListItem>;
                  })}
                </div>
              </div>

              <div
                onClick={() => setIsInterestsListPopupOpen(true)}
                className={styles.showAll}
              >
                Show all
              </div>
            </>
          )}
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
