import type {
  Dispatch,
  FC,
  ReactElement,
  RefObject,
  SetStateAction,
} from 'react';
import { memo, useEffect } from 'react';
import type Slider from 'react-slick';
import classNames from 'classnames';

import type { ShortUser, User } from '@ducks-tinder-client/common';
import { ImageSlider } from '@ducks-tinder-client/ui';

import { getUserSliderInfo } from '@entities/user';

import { NoSlider, SliderContent } from './components';
import styles from './UserSlider.module.scss';

interface ImageSliderProps {
  user: User | ShortUser;
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  extraClassName?: string;
  isShadow?: boolean;
  isFull?: boolean;
  sliderRef?: RefObject<Slider>;
  disabled?: boolean;
  noSlider?: boolean;
  extraContent?: ReactElement;
}

export const UserSlider: FC<ImageSliderProps> = memo(
  ({
    user,
    currentSlide,
    setCurrentSlide,
    disabled,
    isFull,
    noSlider,
    extraContent,
    extraClassName,
    ...sliderProps
  }) => {
    useEffect(() => {
      setCurrentSlide(0);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.id]);

    if (noSlider) {
      return (
        <NoSlider
          avatar={user.pictures[0]?.name}
          extraContent={extraContent}
          extraClassName={extraClassName}
        />
      );
    }

    const cn = classNames(styles.image, isFull && styles.full);

    return (
      <ImageSlider
        images={user.pictures}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        extraClassName={cn}
        disabled={disabled}
        content={
          !isFull ? (
            <SliderContent
              currentSlide={currentSlide}
              age={user.age}
              info={getUserSliderInfo(user)}
              name={user.name}
              disabled={disabled}
            />
          ) : undefined
        }
        {...sliderProps}
      />
    );
  }
);
