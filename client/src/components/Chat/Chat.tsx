import styles from './Chat.module.scss';
import Status from './Status/Status';
import ChatForm from './Form/ChatForm';
import Messages from './Messages/Messages';
import { useAppSelector } from '../../redux/store';

export const Chat = () => {
  const isConnected = useAppSelector((state) => state.chatPage.isConnected);

  return (
    <>
      <Status />
      {isConnected && (
        <div className={styles.container}>
          <Messages />
          <ChatForm />
        </div>
      )}
    </>
  );
};
