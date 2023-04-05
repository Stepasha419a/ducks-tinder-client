import type { FC } from 'react';
import { useState } from 'react';
import {
  faCircleDown,
  faCircleInfo,
  faHouse,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { User } from '../../shared/api/interfaces';
import { ImageSlider } from '../ImagesSlider/ImageSlider';
import { Button } from '../../shared/ui';
import styles from './Preview.module.scss';
import { InterestsListPopup } from '../popups';

interface PreviewPropsInterface {
  user: User;
  setIsFullPreview?: (setting: boolean) => void;
  isFull?: boolean;
  isShadow?: boolean;
  extraClassName?: string;
}

export const Preview: FC<PreviewPropsInterface> = ({
  user,
  setIsFullPreview = () => {},
  isFull = false,
  isShadow = false,
  extraClassName,
}) => {
  const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] =
    useState(false);

  const isSetIsFullPreview = Boolean(setIsFullPreview.length);

  const interestsForLoop = [];

  for (let i = 0; i < 4; i++) {
    if (user.interests[i]) interestsForLoop.push(user.interests[i]);
  }

  const cn = classNames(styles.preview, extraClassName, isFull && styles.full);

  return (
    <div className={cn}>
      <div className={classNames(styles.slider)}>
        <ImageSlider
          images={[user.pictures.avatar, ...user.pictures.gallery]}
          userId={user._id}
          extraClassName={styles.image}
          extraWrapperClassName={classNames(isShadow && styles.wrapper)}
          arrowsExtraClassName={classNames(isShadow && styles.arrows)}
        />
        {isFull && isSetIsFullPreview && (
          <Button
            variant="mark"
            onClick={() => setIsFullPreview(false)}
            extraClassName={styles.closeFullPreview}
          >
            <FontAwesomeIcon icon={faCircleDown} className={styles.icon} />
          </Button>
        )}
      </div>
      <div onClick={() => setIsFullPreview(true)} className={styles.descr}>
        <div className={styles.person}>
          {user.name} <span className={styles.years}>{user.age}</span>
        </div>
        <div className={styles.place}>
          <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          <div>Lives in {user.partnerSettings.place}</div>
        </div>
        <div className={styles.distance}>
          <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
          {user.partnerSettings.distance}
          <span className={styles.text}>km from you</span>
        </div>
        {!isFull && (
          <Button
            variant="mark"
            onClick={() => setIsFullPreview(true)}
            extraClassName={styles.openFullPreview}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
          </Button>
        )}
      </div>
      {isFull && (
        <>
          <hr className={styles.separator} />
          <div className={styles.description}>{user.description}</div>
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
              interestsList={user.interests}
              setIsInterestsListPopupOpen={setIsInterestsListPopupOpen}
            />
          )}
        </>
      )}
    </div>
  );
};
