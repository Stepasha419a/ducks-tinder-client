import type { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import {
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
import styles from './Preview.module.scss';
import { FullPreview } from './full/FullPreview';

interface PreviewPropsInterface {
  user: PreviewUser | ShortUser;
  setIsFullPreview?: Dispatch<SetStateAction<boolean>>;
  isFull?: boolean;
  isShadow?: boolean;
  extraContent?: ReactElement;
  extraClassName?: string;
}

export const Preview: FC<PreviewPropsInterface> = ({
  user,
  setIsFullPreview,
  isFull = false,
  isShadow = false,
  extraContent,
  extraClassName,
}) => {
  if (isFull) {
    return (
      <FullPreview
        user={user}
        setIsFullPreview={setIsFullPreview}
        extraClassName={extraClassName}
        extraContent={extraContent}
      />
    );
  }

  const cn = classNames(styles.preview, extraClassName);

  return (
    <div className={cn}>
      <div className={classNames(styles.slider)}>
        <ImageSlider
          images={user.pictures}
          userId={user.id}
          extraClassName={styles.image}
          isShadow={isShadow}
        />
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
        {setIsFullPreview && (
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
    </div>
  );
};
