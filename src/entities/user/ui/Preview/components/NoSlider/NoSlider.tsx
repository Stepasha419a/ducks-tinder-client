import type { FC, ReactElement } from 'react';
import { makeImageUrl, showDefaultImage } from '@shared/lib';

interface NoSliderProps {
  avatar?: string;
  imageCn?: string;
  extraContent?: ReactElement;
}

export const NoSlider: FC<NoSliderProps> = ({
  avatar,
  extraContent,
  imageCn,
}) => {
  return (
    <>
      <img
        src={makeImageUrl(avatar)}
        alt="user"
        onError={showDefaultImage}
        className={imageCn}
      ></img>
      {extraContent}
    </>
  );
};
