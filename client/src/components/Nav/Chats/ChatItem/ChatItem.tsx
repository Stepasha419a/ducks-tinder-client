import { MutableRefObject, useEffect, useState } from 'react';
import { IChat } from '../../../../models/IChat';
import { IUser } from '../../../../models/IUser';
import {
  connectChatThunk,
  disconnectChatThunk,
} from '../../../../redux/chatReducer';
import { Socket } from 'socket.io-client';
import styles from './ChatItem.module.scss';
import Avatar from '../../../Avatar/Avatar';
import { useAppDispatch, useAppSelector } from '../../../../redux/reduxStore';

interface ChatInterface {
  chat: IChat;
  chatCompanionId: string | undefined;
  socket: MutableRefObject<Socket | undefined>;
  currentChatId: string;
}

const ChatItem: React.FC<ChatInterface> = ({
  chat,
  chatCompanionId,
  socket,
  currentChatId,
}) => {
  const dispatch = useAppDispatch();

  const chatsUsers = useAppSelector((state) => state.chatPage.chatsUsers);

  const [chatPartner, setChatPartner] = useState<IUser | null>(null);

  function connect(chatId: string) {
    dispatch(disconnectChatThunk({ socket }));
    dispatch(connectChatThunk({ socket, chatId }));
  }

  useEffect(() => {
    return () => {
      dispatch(disconnectChatThunk({ socket }));
    };
  }, [dispatch, socket]);

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
        otherUserId={chatCompanionId}
        imageExtraClassName="_chat"
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
