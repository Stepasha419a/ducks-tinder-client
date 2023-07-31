import classNames from 'classnames';
import type { FC } from 'react';
import type { AvatarProps } from './Avatar.types';
import { makeImageUrl, showDefaultImage } from '@shared/helpers';
import styles from './Avatar.module.scss';

export const Avatar: FC<AvatarProps> = ({
  size = 's',
  extraClassName,
  avatarUrl,
  userId,
}) => {
  const imageUrl = makeImageUrl(userId, avatarUrl);

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
