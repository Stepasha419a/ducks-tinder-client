import { Chat } from '../../../../../models/Chat/Chat';
import { User } from '../../../../../models/User/User';
import styles from './ChatItem.module.scss';
import { Avatar } from '../../../../ui';
import classNames from 'classnames';

interface ChatInterface {
  chat: Chat;
  chatCompanion: User | undefined;
  currentChatId: string;
  connect: (chatId: string) => void;
}

const ChatItem: React.FC<ChatInterface> = ({
  chat,
  chatCompanion,
  currentChatId,
  connect,
}) => {
  if (!chatCompanion) {
    return null;
  }

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
          {chat.messages.length
            ? chat.messages[chat.messages.length - 1]?.userId ===
              chatCompanion._id
              ? `${chatCompanion.name}: `
              : 'you: '
            : 'send first message'}

          {chat.messages[chat.messages.length - 1]?.content}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
