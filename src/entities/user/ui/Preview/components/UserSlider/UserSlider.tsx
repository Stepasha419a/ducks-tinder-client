import { useState, type FC, type RefObject } from 'react';
import type Slider from 'react-slick';
import { getUserSliderInfo } from '@entities/user';
import type { ShortUser, User } from '@shared/api';
import { ImageSlider } from '@shared/ui';
import { SliderContent } from './components';

interface ImageSliderProps {
  user: User | ShortUser;
  extraClassName?: string;
  isShadow?: boolean;
  sliderRef?: RefObject<Slider>;
  disabled?: boolean;
}

export const UserSlider: FC<ImageSliderProps> = ({
  user,
  disabled,
  ...sliderProps
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <ImageSlider
      images={user.pictures}
      currentSlide={currentSlide}
      setCurrentSlide={setCurrentSlide}
      disabled={disabled}
      content={
        <SliderContent
          currentSlide={currentSlide}
          age={user.age}
          info={getUserSliderInfo(user)}
          name={user.name}
          disabled={disabled}
        />
      }
      {...sliderProps}
    />
  );
};
