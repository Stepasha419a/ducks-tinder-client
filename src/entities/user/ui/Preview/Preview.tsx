import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type {
  Dispatch,
  FC,
  ReactElement,
  RefObject,
  SetStateAction,
} from 'react';
import type Slider from 'react-slick';
import type {
  ShortUser,
  ShortUserWithoutDistance,
  User,
} from '@shared/api/interfaces';
import { Button } from '@shared/ui';
import styles from './Preview.module.scss';
import { UserSlider, FullPreview } from './ui';

interface PreviewPropsInterface {
  user: User | ShortUser | ShortUserWithoutDistance;
  setIsFullPreview?:
    | Dispatch<SetStateAction<boolean>>
    | ((value: boolean) => void);
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
          extraClassName={styles.image}
          isShadow={isShadow}
          sliderRef={sliderRef}
        />
      </div>
      <div
        onClick={() => setIsFullPreview && setIsFullPreview(true)}
        className={styles.descr}
      >
        {setIsFullPreview && (
          <Button
            variant="mark"
            onClick={() => setIsFullPreview(true)}
            extraClassName={styles.openFullPreview}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
          </Button>
        )}
      </div>
    </div>
  );
};
