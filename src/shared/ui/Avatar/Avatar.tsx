import classNames from 'classnames';
import type { FC } from 'react';
import { makeImageUrl, showDefaultImage } from '@shared/helpers';
import styles from './Avatar.module.scss';
import type { AvatarProps } from './Avatar.types';

export const Avatar: FC<AvatarProps> = ({
  size = 's',
  extraClassName,
  avatarUrl,
}) => {
  const imageUrl = makeImageUrl(avatarUrl);

  const cnContainer = classNames(
    styles.container,
    styles[size],
    extraClassName
  );
  const cn = classNames(styles.image, styles[size]);

  return (
    <div className={cnContainer}>
      <img
        draggable="false"
        className={cn}
        src={imageUrl}
        onError={showDefaultImage}
        alt="avatar"
      />
    </div>
  );
};
