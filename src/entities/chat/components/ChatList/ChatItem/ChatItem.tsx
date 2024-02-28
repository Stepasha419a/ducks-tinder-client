import type { FC } from 'react';
import classNames from 'classnames';
import { Avatar } from '@shared/ui';
import { getIsNewMessages } from '@entities/chat/lib';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/constants';
import styles from './ChatItem.module.scss';
import type { Chat } from '@/shared/api/interfaces';

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

  const isNewMessages = getIsNewMessages(
    chat,
    isActive,
    chat.lastMessage?.userId !== chat.chatVisit?.userId
  );

  const chatLink = `${ROUTES.chat}/${chat.id}`;

  return (
    <Link
      to={chatLink}
      className={classNames(styles.item, isActive && styles.active)}
    >
      <Avatar size="m" fullUrl={chat.avatar} />
      <div className={styles.descr}>
        <div className={styles.name}>{chat.name}</div>
        <div className={styles.message}>
          {messageName}
          {chat.lastMessage?.text}
        </div>
        {isNewMessages && <div className={styles.count} />}
      </div>
    </Link>
  );
};
