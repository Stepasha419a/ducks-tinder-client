import type { ReactNode } from 'react';
import styles from './Message.module.scss';
import { Content, MessageAvatar, Select } from './components';

interface MessageProps {
  children: ReactNode;
}

export const Message = ({ children }: MessageProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

Message.Content = Content;
Message.Select = Select;
Message.Avatar = MessageAvatar;
