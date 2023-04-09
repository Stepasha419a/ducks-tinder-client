import type { FC } from 'react';
import classNames from 'classnames';
import type { User, Chat } from '@shared/api/interfaces';
import styles from './ChatItem.module.scss';
import { Avatar } from '@shared/ui';

interface ChatInterface {
  chat: Chat;
  chatCompanion: User | undefined;
  currentChatId: string;
  connect: (chatId: string) => void;
}

const ChatItem: FC<ChatInterface> = ({
  chat,
  chatCompanion,
  currentChatId,
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
      className={classNames(
        styles.item,
        currentChatId === chat._id && styles.item_active
      )}
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

export default ChatItem;
