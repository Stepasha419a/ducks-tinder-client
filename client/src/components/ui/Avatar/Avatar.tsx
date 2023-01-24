import classNames from 'classnames';
import { makeImageUrl } from '../helpers';
import styles from './Avatar.module.scss';

interface AvatarInterface {
  size?: 's' | 'm';
  userId?: string;
  extraClassName?: string;
  avatarUrl?: string;
}

export const Avatar: React.FC<AvatarInterface> = ({
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
      <img className={cn} src={imageUrl} alt="avatar" />
    </div>
  );
};
