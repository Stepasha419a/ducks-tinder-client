import { useEffect, useState } from 'react';
import { IChat } from '../../../../../models/IChat';
import { IUser } from '../../../../../models/IUser';
import styles from './ChatItem.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../redux/store';
import { Avatar } from '../../../../ui';
import { connectChatThunk, disconnectChatThunk } from '../../../../../redux/chat/chat.thunks';

interface ChatInterface {
  chat: IChat;
  chatCompanionId: string | undefined;
  currentChatId: string;
}

const ChatItem: React.FC<ChatInterface> = ({
  chat,
  chatCompanionId,
  currentChatId,
}) => {
  const dispatch = useAppDispatch();

  const chatsUsers = useAppSelector((state) => state.chatPage.chatsUsers);

  const [chatPartner, setChatPartner] = useState<IUser | null>(null);

  function connect(chatId: string) {
    dispatch(disconnectChatThunk());
    dispatch(connectChatThunk({ chatId }));
  }

  useEffect(() => {
    return () => {
      dispatch(disconnectChatThunk());
    };
  }, [dispatch]);

  useEffect(() => {
    let user = chatsUsers.find((user) => user._id === chatCompanionId);
    if (user) {
      setChatPartner(user);
    }
  }, [chatsUsers, chatCompanionId]);

  if (!chatPartner) {
    return null;
  }

  return (
    <div
      onClick={() => connect(chat._id)}
      className={`${styles.item} ${
        currentChatId === chat._id ? styles.item_active : ''
      }`}
    >
      <Avatar
        userId={chatCompanionId}
        size="m"
        avatarUrl={chatPartner.pictures.avatar}
      />
      <div className={styles.descr}>
        <div className={styles.name}>{chatPartner.name}</div>
        <div className={styles.message}>
          {chat.messages.length
            ? chat.messages[chat.messages.length - 1]?.userId ===
              chatPartner._id
              ? `${chatPartner.name}: `
              : 'you: '
            : 'send first message'}

          {chat.messages[chat.messages.length - 1]?.content}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
