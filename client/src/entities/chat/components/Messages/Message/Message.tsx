import type { FC, ReactElement } from 'react';
import classNames from 'classnames';
import { Avatar } from '@shared/ui';
import type { Message as MessageType } from '@shared/api/interfaces';
import styles from './Message.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

interface MessageProps {
  isOwn: boolean;
  message: MessageType;
  username: string;
  select: ReactElement;
  avatar?: string;
  isSelectOpen: boolean;
  setCurrentMessage: (message: MessageType) => void;
}

export const Message: FC<MessageProps> = ({
  isOwn,
  message,
  username,
  select,
  avatar,
  isSelectOpen,
  setCurrentMessage,
}) => {
  const cnMessage = classNames(
    styles.message,
    isOwn && styles.own,
    isSelectOpen && styles.editing
  );

  const handleSelectClick = () => {
    setCurrentMessage(message);
  };

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
          <div className={styles.content}>{message.text}</div>
        </div>
        {isOwn &&
          (isSelectOpen ? (
            select
          ) : (
            <FontAwesomeIcon
              onClick={handleSelectClick}
              className={styles.dots}
              icon={faEllipsis}
            />
          ))}
      </div>
    </div>
  );
};
