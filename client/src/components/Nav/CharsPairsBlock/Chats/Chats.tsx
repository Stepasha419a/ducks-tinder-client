import { useEffect } from 'react';
import type { ReactElement } from 'react';
import type { Chat } from '@shared/api/interfaces';
import ChatItem from './ChatItem/ChatItem';
import styles from './Chats.module.scss';
import FailedChats from './Failed/FailedChats';
import {
  closeAllSockets,
  connectChatThunk,
  disconnectChatThunk,
  getChatsThunk,
} from '@entities/chat/model';
import { Preloader } from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';

const Chats = (): ReactElement => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.user.currentUser);
  const chats = useAppSelector((state) => state.chat.chats);
  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const chatsUsers = useAppSelector((state) => state.chat.chatsUsers);
  const isLoading = useAppSelector((state) => state.chat.isLoading);

  useEffect(() => {
    dispatch(getChatsThunk(currentUser._id));
  }, [currentUser._id, currentUser.chats.length, chats.length, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(closeAllSockets());
    };
  }, [dispatch]);

  function connect(chatId: string): void {
    if (chatId !== currentChatId) {
      if (currentChatId) dispatch(disconnectChatThunk());
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
        const chatCompanion = chatsUsers.find(
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
