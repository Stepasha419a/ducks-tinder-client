import { makeImageUrl, showDefaultImage } from '@ducks-tinder-client/ui';
import classNames from 'classnames';
import type { FC, ReactElement } from 'react';
import styles from './NoSlider.module.scss';

interface NoSliderProps {
  avatar?: string;
  extraClassName?: string;
  extraContent?: ReactElement;
}

export const NoSlider: FC<NoSliderProps> = ({
  avatar,
  extraContent,
  extraClassName,
}) => {
  const cn = classNames(styles.image, extraClassName);

  return (
    <>
      <img
        src={makeImageUrl(avatar)}
        alt="user"
        onError={showDefaultImage}
        className={cn}
      ></img>
      {extraContent}
    </>
  );
};
