import type { FC } from 'react';
import classNames from 'classnames';

import { makeImageUrl, showDefaultImage } from '@shared/lib';

import type { AvatarProps } from './Avatar.types';
import styles from './Avatar.module.scss';
import { useLocaleContext } from '@shared/model';

export const Avatar: FC<AvatarProps> = ({
  size = 's',
  extraClassName,
  avatarUrl,
}) => {
  const locale = useLocaleContext();

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
        alt={locale.altAvatar}
      />
    </div>
  );
};
