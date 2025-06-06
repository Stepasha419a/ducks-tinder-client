import type { FC } from 'react';

import { Avatar } from '@ducks-tinder-client/ui';

import * as styles from './MessageAvatar.module.scss';

interface MessageAvatarProps {
  userId: string;
  avatar?: string;
}

export const MessageAvatar: FC<MessageAvatarProps> = ({ avatar }) => {
  return <Avatar avatarUrl={avatar} extraClassName={styles.avatar} />;
};
