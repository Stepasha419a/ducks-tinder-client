import styles from './Chat.module.scss';
import { useAppSelector } from '../../redux/store';
import Status from './Status/Status';
import ChatForm from './Form/ChatForm';
import Messages from './Messages/Messages';

export const Chat = () => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const isConnected = useAppSelector((state) => state.chatPage.isConnected);

  return (
    <div className={styles.chat}>
      {isConnected ? (
        <>
          <div className={styles.container}>
            <Messages currentUser={currentUser} />
            <ChatForm currentUser={currentUser} />
          </div>
        </>
      ) : (
        <Status />
      )}
    </div>
  );
};
