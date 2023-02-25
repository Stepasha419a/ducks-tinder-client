import { useEffect } from 'react';
import { IChat } from '../../../../models/IChat';
import ChatItem from './ChatItem/ChatItem';
import styles from './Chats.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import FailedChats from './Failed/FailedChats';
import { getChatsThunk } from '../../../../redux/chat/chat.thunks';

const Chats = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const chats = useAppSelector((state) => state.chatPage.chats);
  const currentChatId = useAppSelector((state) => state.chatPage.currentChatId);
  const socket = useAppSelector((state) => state.chatPage.socket);

  useEffect(() => {
    dispatch(getChatsThunk(currentUser._id));
  }, [currentUser._id, dispatch]);

  if (!chats.length) {
    return <FailedChats />;
  }

  return (
    <div className={styles.chats}>
      {chats.map((chat: IChat) => {
        const chatCompanionId = chat.members.find(
          (member) => member !== currentUser._id
        );
        return (
          <ChatItem
            key={chat._id}
            chat={chat}
            chatCompanionId={chatCompanionId}
            socket={socket!}
            currentChatId={currentChatId}
          />
        );
      })}
    </div>
  );
};

export default Chats;
