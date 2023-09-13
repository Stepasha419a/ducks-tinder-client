import { useState, type FC, type RefObject } from 'react';
import type Slider from 'react-slick';
import type { ShortUser } from '@/shared/api/interfaces';
import type { PreviewUser } from '@/entities/user/model';
import { ImageSlider } from '@/shared/ui';
import { SliderContent } from './components';

interface ImageSliderProps {
  user: PreviewUser | ShortUser;
  userId: string;
  extraClassName?: string;
  isShadow?: boolean;
  sliderRef?: RefObject<Slider>;
}

export const UserSlider: FC<ImageSliderProps> = ({ user, ...sliderProps }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      <ImageSlider
        images={user.pictures}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        content={<SliderContent currentSlide={currentSlide} user={user} />}
        {...sliderProps}
      />
    </>
  );
};
