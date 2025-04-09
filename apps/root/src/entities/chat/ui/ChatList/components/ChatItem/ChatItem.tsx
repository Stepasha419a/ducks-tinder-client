import type { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import type { Chat } from '@ducks-tinder-client/common';
import { ROUTES } from '@ducks-tinder-client/common';
import { Avatar } from '@ducks-tinder-client/ui';

import styles from './ChatItem.module.scss';

interface ChatInterface {
  chat: Chat;
  isActive: boolean;
  currentUserId: string;
}

export const ChatItem: FC<ChatInterface> = ({
  chat,
  isActive,
  currentUserId,
}) => {
  const username =
    chat.lastMessage &&
    (currentUserId === chat.lastMessage.userId ? 'you' : chat.lastMessage.name);

  const messageName = username ? `${username}: ` : 'send first message';

  const isNewMessages = chat.newMessagesCount > 0 && !isActive;

  const newMessagesCount =
    chat.newMessagesCount > 9 ? '9+' : chat.newMessagesCount;

  const chatLink = `${ROUTES.CHAT}/${chat.id}`;

  return (
    <Link
      to={chatLink}
      className={classNames(styles.item, isActive && styles.active)}
    >
      <Avatar size="m" avatarUrl={chat.avatar} />
      <div className={styles.descr}>
        <div className={styles.name}>{chat.name}</div>
        <div className={styles.message}>
          {messageName}
          {chat.lastMessage?.text}
        </div>
        {isNewMessages && (
          <div className={styles.newMessages}>
            <div className={styles.count}>{newMessagesCount}</div>
          </div>
        )}
      </div>
    </Link>
  );
};
