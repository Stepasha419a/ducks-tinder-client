import { Avatar } from '@shared/ui';
import classNames from 'classnames';
import type { Chat, User } from '@shared/api/interfaces';
import type { FC } from 'react';
import styles from './ChatItem.module.scss';

interface ChatInterface {
  chat: Chat;
  chatCompanion: User | undefined;
  isActive: boolean;
  connect: (chatId: string) => void;
}

export const ChatItem: FC<ChatInterface> = ({
  chat,
  chatCompanion,
  isActive,
  connect,
}) => {
  if (!chatCompanion) {
    return null;
  }

  const isCompanion =
    chat.messages[chat.messages.length - 1]?.userId === chatCompanion._id;

  const username = isCompanion ? `${chatCompanion.name}: ` : 'you: ';

  const messageName = chat.messages.length ? username : 'send first message';

  return (
    <div
      onClick={() => connect(chat._id)}
      className={classNames(styles.item, isActive && styles.item_active)}
    >
      <Avatar
        userId={chatCompanion._id}
        size="m"
        avatarUrl={chatCompanion.pictures.avatar}
      />
      <div className={styles.descr}>
        <div className={styles.name}>{chatCompanion.name}</div>
        <div className={styles.message}>
          {messageName}
          {chat.messages[chat.messages.length - 1]?.content}
        </div>
      </div>
    </div>
  );
};
