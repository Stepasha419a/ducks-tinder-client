import classNames from 'classnames';
import { FC } from 'react';
import { Message } from '../../../models/Chat';
import { Avatar } from '../Avatar/Avatar';
import styles from './ChatMessage.module.scss';

interface MessageProps {
  isOwn: boolean;
  message: Message;
  username: string;
  avatar?: string;
}

export const ChatMessage: FC<MessageProps> = ({
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
