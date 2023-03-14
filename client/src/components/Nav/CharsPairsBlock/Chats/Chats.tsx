import { useEffect } from 'react';
import { Chat } from '../../../../models/Chat/Chat';
import ChatItem from './ChatItem/ChatItem';
import styles from './Chats.module.scss';
import FailedChats from './Failed/FailedChats';
import {
  closeAllSockets,
  connectChatThunk,
  disconnectChatThunk,
  getChatsThunk,
} from '../../../../redux/chat/chat.thunks';
import Preloader from '../../../Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

const Chats = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const chats = useAppSelector((state) => state.chatPage.chats);
  const currentChatId = useAppSelector((state) => state.chatPage.currentChatId);
  const chatsUsers = useAppSelector((state) => state.chatPage.chatsUsers);
  const isLoading = useAppSelector((state) => state.chatPage.isLoading);

  useEffect(() => {
    dispatch(getChatsThunk(currentUser._id));
  }, [currentUser._id, currentUser.chats.length, chats.length, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(closeAllSockets());
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

  if (!chats.length || isLoading) {
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
