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
}

export const ChatItem: FC<ChatInterface> = ({ chat, isActive }) => {
  const messageName = chat.lastMessage ? chat.name : 'send first message';
  const isNewMessages = getIsNewMessages(
    chat,
    isActive,
    chat.lastMessage?.userId === chat.chatVisit?.userId
  );

  const chatLink = `${ROUTES.chat}/${chat.id}`;

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
        {isNewMessages && <div className={styles.count} />}
      </div>
    </Link>
  );
};
