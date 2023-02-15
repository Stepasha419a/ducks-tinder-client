import classNames from 'classnames';
import { FC } from 'react';
import { IMessage } from '../../../models/IChat';
import { Avatar } from '../Avatar/Avatar';
import styles from './Message.module.scss';

interface MessageProps {
  isOwn: boolean;
  message: IMessage;
  username: string;
  avatar?: string;
}

export const Message: FC<MessageProps> = ({
  isOwn,
  message,
  username,
  avatar,
}) => {
  const cnMessage = classNames(styles.message, isOwn && styles.message_own);
  const cnMark = classNames(styles.mark, isOwn && styles.mark_own);
  console.log(message);

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
