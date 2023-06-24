import type { ReactNode } from 'react';
import { Avatar } from '@shared/ui';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import styles from './Message.module.scss';
import { Content, Select } from './components';

interface MessageProps {
  message: MessageInterface;
  avatar?: string;
  children: ReactNode;
}

export const Message = ({ children, message, avatar }: MessageProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Avatar
          userId={message.userId}
          avatarUrl={avatar}
          extraClassName={styles.avatar}
        />
        {children}
      </div>
    </div>
  );
};

Message.Content = Content;
Message.Select = Select;
