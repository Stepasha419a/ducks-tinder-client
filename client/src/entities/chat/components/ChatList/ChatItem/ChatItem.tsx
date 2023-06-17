import { Avatar } from '@shared/ui';
import classNames from 'classnames';
import type { Chat, ShortUser } from '@shared/api/interfaces';
import type { FC } from 'react';
import styles from './ChatItem.module.scss';

interface ChatInterface {
  chat: Chat;
  chatCompanion: ShortUser | undefined;
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
    chat.messages[chat.messages.length - 1]?.userId === chatCompanion.id;

  const username = isCompanion ? `${chatCompanion.name}: ` : 'you: ';

  const messageName = chat.messages.length ? username : 'send first message';

  return (
    <div
      onClick={() => connect(chat.id)}
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
      </div>
    </div>
  );
};
