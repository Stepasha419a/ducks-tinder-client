import classNames from 'classnames';
import type { FC } from 'react';
import { Avatar } from '../../../../../shared/ui';
import type { Message as MessageType } from '../../../../../shared/api/interfaces';
import styles from './Message.module.scss';

interface MessageProps {
  isOwn: boolean;
  message: MessageType;
  username: string;
  avatar?: string;
}

export const Message: FC<MessageProps> = ({
  isOwn,
  message,
  username,
  avatar,
}) => {
  const cnMessage = classNames(styles.message, isOwn && styles.own);
  const cnMark = classNames(styles.mark, isOwn && styles.own);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Avatar
          userId={message.userId}
          avatarUrl={avatar}
          extraClassName={styles.avatar}
        />
        <div className={cnMessage}>
          {!isOwn && <div className={styles.username}>{username}</div>}
          <div className={styles.content}>{message.content}</div>
          <div className={cnMark}></div>
        </div>
      </div>
    </div>
  );
};
