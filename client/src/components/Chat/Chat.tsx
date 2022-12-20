import {
  KeyboardEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import Message from './Message/Message';
import { IMessage } from '../../models/IChat';
import { isRefElementVisible, scrollToBottom } from './utils/ChatUtils';
import { Socket } from 'socket.io-client';
import styles from './Chat.module.scss';
import { useAppSelector } from '../../redux/reduxStore';
import Status from './Status/Status';

interface ChatPropsInterface {
  socket: MutableRefObject<Socket | undefined>;
}

export const Chat: React.FC<ChatPropsInterface> = ({ socket }) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const messages = useAppSelector((state) => state.chatPage.currentMessages);
  const isConnected = useAppSelector((state) => state.chatPage.isConnected);
  const currentChatMembers = useAppSelector(
    (state) => state.chatPage.currentChatMembers
  );

  const [value, setValue] = useState('');

  const bottomElementRef = useRef<null | HTMLElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (bottomElementRef.current && isRefElementVisible(bottomElementRef)) {
      scrollToBottom(bottomElementRef, true);
    }
  }, [messages]);

  useEffect(() => {
    bottomElementRef && scrollToBottom(bottomElementRef);
  }, [currentChatMembers]);

  const sendMessage = async () => {
    const message: IMessage = {
      id: Date.now().toString(),
      username: currentUser.name,
      content: value,
      userId: currentUser._id,
    };
    socket.current?.send(message);
    setValue('');
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={styles.chat}>
      {isConnected ? (
        <div className={styles.container}>
          <div className={styles.messages}>
            {messages.map((message: IMessage) =>
              currentChatMembers.length ? (
                <Message
                  key={message.id}
                  message={message}
                  user={currentChatMembers.find(
                    (item) => item._id === message.userId
                  )}
                  currentUserId={currentUser._id}
                />
              ) : (
                <div key={message.id}>loading message...</div>
              )
            )}
            <div ref={bottomElementRef} className={styles.ref}></div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.form}>
              <input
                onKeyPress={(e) => handleKeyPress(e)}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={styles.input}
                type="text"
              />
              <button onClick={sendMessage} className={styles.button}>
                send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Status />
      )}
    </div>
  );
};
