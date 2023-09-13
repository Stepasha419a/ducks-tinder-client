import type { FC } from 'react';
import { Avatar } from '@shared/ui';
import styles from './MessageAvatar.module.scss';

interface MessageAvatarProps {
  userId: string;
  avatar?: string;
}

export const MessageAvatar: FC<MessageAvatarProps> = ({ userId, avatar }) => {
  return (
    <Avatar userId={userId} avatarUrl={avatar} extraClassName={styles.avatar} />
  );
};
