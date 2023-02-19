import { MutableRefObject } from 'react';
import { Socket } from 'socket.io-client';
import styles from './Chat.module.scss';
import { useAppSelector } from '../../redux/store';
import Status from './Status/Status';
import ChatForm from './Form/ChatForm';
import Messages from './Messages/Messages';

interface ChatPropsInterface {
  socket: MutableRefObject<Socket | undefined>;
}

export const Chat: React.FC<ChatPropsInterface> = ({ socket }) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const isConnected = useAppSelector((state) => state.chatPage.isConnected);

  return (
    <div className={styles.chat}>
      {isConnected ? (
        <>
          <div className={styles.container}>
            <Messages currentUser={currentUser} />
            <ChatForm currentUser={currentUser} socket={socket} />
          </div>
        </>
      ) : (
        <Status />
      )}
    </div>
  );
};
