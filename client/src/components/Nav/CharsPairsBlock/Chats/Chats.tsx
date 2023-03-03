import { useEffect } from 'react';
import { Chat } from '../../../../models/Chat';
import ChatItem from './ChatItem/ChatItem';
import styles from './Chats.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import FailedChats from './Failed/FailedChats';
import {
  connectChatThunk,
  disconnectChatThunk,
  getChatsThunk,
} from '../../../../redux/chat/chat.thunks';
import Preloader from '../../../Preloader/Preloader';

const Chats = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const { chats, currentChatId, chatsUsers } = useAppSelector(
    (state) => state.chatPage
  );

  useEffect(() => {
    dispatch(getChatsThunk(currentUser._id));
  }, [currentUser._id, currentUser.chats.length, chats.length, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(disconnectChatThunk());
    };
  }, [dispatch]);

  function connect(chatId: string) {
    if (chatId !== currentChatId) {
      currentChatId && dispatch(disconnectChatThunk());
      dispatch(connectChatThunk({ chatId }));
    }
  }

  if (!currentUser.chats.length) {
    return <FailedChats />;
  }

  if (!chats.length) {
    return <Preloader />;
  }

  return (
    <div className={styles.chats}>
      {chats.map((chat: Chat) => {
        const chatCompanionId = chat.members.find(
          (member) => member !== currentUser._id
        );
        let chatCompanion = chatsUsers.find(
          (user) => user._id === chatCompanionId
        );
        return (
          <ChatItem
            key={chat._id}
            chat={chat}
            chatCompanion={chatCompanion}
            currentChatId={currentChatId}
            connect={connect}
          />
        );
      })}
    </div>
  );
};

export default Chats;
