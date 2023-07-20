import type { FC } from 'react';
import classNames from 'classnames';
import type {
  ShortChat,
  ShortUser,
  ShortUserWithoutDistance,
} from '@shared/api/interfaces';
import { Avatar } from '@shared/ui';
import { getIsNewMessages } from '@entities/chat/lib';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/constants';
import styles from './ChatItem.module.scss';

interface ChatInterface {
  chat: ShortChat;
  chatCompanion: ShortUserWithoutDistance | ShortUser | undefined;
  isActive: boolean;
}

export const ChatItem: FC<ChatInterface> = ({
  chat,
  chatCompanion,
  isActive,
}) => {
  if (!chatCompanion) {
    return null;
  }

  const isCompanion =
    chat.messages[chat.messages.length - 1]?.userId === chatCompanion.id;
  const username = isCompanion ? `${chatCompanion.name}: ` : 'you: ';
  const messageName = chat.messages.length ? username : 'send first message';
  const isNewMessages = getIsNewMessages(chat);

  const chatLink = `${ROUTES.chat}/${chat.id}`;

  return (
    <Link
      to={chatLink}
      className={classNames(styles.item, isActive && styles.active)}
    >
      <Avatar
        userId={chatCompanion.id}
        size="m"
        avatarUrl={chatCompanion.pictures[0]?.name}
      />
      <div className={styles.descr}>
        <div className={styles.name}>{chatCompanion.name}</div>
        <div className={styles.message}>
          {messageName}
          {chat.messages[chat.messages.length - 1]?.text}
        </div>
        {isNewMessages && <div className={styles.count} />}
      </div>
    </Link>
  );
};
