import type {
  Dispatch,
  FC,
  ReactElement,
  RefObject,
  SetStateAction,
} from 'react';
import { useState } from 'react';
import type Slider from 'react-slick';
import type { ShortUser, ShortUserWithoutDistance, User } from '@shared/api';
import { UserSlider, PreviewWrapper } from './components';

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

  return (
    <PreviewWrapper
      user={user}
      extraContent={extraContent}
      disabled={disabled}
      extraClassName={extraClassName}
      setIsFullPreview={setIsFullPreview}
      isFull={isFull}
      slider={
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
      }
    />
  );
};
