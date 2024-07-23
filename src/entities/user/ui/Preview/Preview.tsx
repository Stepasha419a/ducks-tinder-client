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
import { UserSlider, FullPreview, NoSlider } from './ui';

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
  noSlider?: boolean;
}

export const Preview: FC<PreviewPropsInterface> = ({
  user,
  setIsFullPreview,
  isFull = false,
  isShadow = false,
  extraContent,
  extraClassName,
  sliderRef,
  noSlider,
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
        {noSlider ? (
          <NoSlider
            avatar={user.pictures[0]?.name}
            extraContent={extraContent}
            imageCn={cn}
          />
        ) : (
          <UserSlider
            user={user}
            extraClassName={styles.image}
            isShadow={isShadow}
            sliderRef={sliderRef}
          />
        )}
      </div>
      {setIsFullPreview && (
        <div onClick={() => setIsFullPreview(true)} className={styles.descr}>
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
  );
};
