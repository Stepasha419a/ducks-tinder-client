import classNames from 'classnames';
import { makeImageUrl } from '../helpers';
import { AvatarProps } from './Avatar.types';
import styles from './Avatar.module.scss';

export const Avatar: React.FC<AvatarProps> = ({
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
      <img draggable='false' className={cn} src={imageUrl} alt="avatar" />
    </div>
  );
};
