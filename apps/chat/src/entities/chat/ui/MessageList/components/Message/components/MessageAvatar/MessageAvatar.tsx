import type { FC } from 'react';

import { Avatar } from '@ducks-tinder-client/ui';

import * as styles from './MessageAvatar.module.scss';

interface MessageAvatarProps {
  userId: string;
  avatar?: string;
  showAvatar?: boolean;
}

export const MessageAvatar: FC<MessageAvatarProps> = ({
  avatar,
  showAvatar,
}) => {
  return (
    <div className={styles.avatar}>
      {showAvatar && <Avatar avatarUrl={avatar} />}
    </div>
  );
};
