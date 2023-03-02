import styles from './Chat.module.scss';
import Status from './Status/Status';
import ChatForm from './Form/ChatForm';
import Messages from './Messages/Messages';

export const Chat = () => {
  return (
    <>
      <div className={styles.container}>
        <Messages />
        <ChatForm />
      </div>
      <Status />
    </>
  );
};
