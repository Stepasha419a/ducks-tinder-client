import type {
  ShortUser,
  ShortUserWithoutDistance,
  User,
} from '@ducks-tinder-client/common';
import classNames from 'classnames';
import type { FC, ReactElement, RefObject } from 'react';
import { useState } from 'react';
import type Slider from 'react-slick';
import { FullPreview, TogglePreview, UserSlider } from './components';
import styles from './Preview.module.scss';

interface PreviewPropsInterface {
  user: User | ShortUser | ShortUserWithoutDistance;
  setIsFullPreview?: (value: boolean) => void;
  isFull?: boolean;
  isShadow?: boolean;
  extraContent?: ReactElement;
  extraClassName?: string;
  sliderRef?: RefObject<Slider>;
  noSlider?: boolean;
  disabled?: boolean;
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
  disabled,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const cn = classNames(styles.preview, isFull && styles.full, extraClassName);

  return (
    <div className={cn}>
      <div className={styles.slider}>
        <UserSlider
          user={user}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isFull={isFull}
          isShadow={isShadow}
          sliderRef={sliderRef}
          disabled={disabled}
          extraContent={extraContent}
          noSlider={noSlider}
        />
        {!disabled && setIsFullPreview && (
          <TogglePreview setIsFullPreview={setIsFullPreview} isFull={isFull} />
        )}
      </div>
      {isFull && <FullPreview user={user} extraContent={extraContent} />}
    </div>
  );
};
