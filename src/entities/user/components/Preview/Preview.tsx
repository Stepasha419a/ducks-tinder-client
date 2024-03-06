import type {
  Dispatch,
  FC,
  ReactElement,
  RefObject,
  SetStateAction,
} from 'react';
import { faCircleInfo, faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type Slider from 'react-slick';
import classNames from 'classnames';
import type {
  ShortUser,
  ShortUserWithoutDistance,
  User,
} from '@shared/api/interfaces';
import { Button } from '@shared/ui';
import { FullPreview } from './full/FullPreview';
import { UserSlider } from './components';
import styles from './Preview.module.scss';

interface PreviewPropsInterface {
  user: User | ShortUser | ShortUserWithoutDistance;
  setIsFullPreview?: Dispatch<SetStateAction<boolean>>;
  isFull?: boolean;
  isShadow?: boolean;
  extraContent?: ReactElement;
  extraClassName?: string;
  sliderRef?: RefObject<Slider>;
}

export const Preview: FC<PreviewPropsInterface> = ({
  user,
  setIsFullPreview,
  isFull = false,
  isShadow = false,
  extraContent,
  extraClassName,
  sliderRef,
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
        <UserSlider
          user={user}
          userId={user.id}
          extraClassName={styles.image}
          isShadow={isShadow}
          sliderRef={sliderRef}
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
