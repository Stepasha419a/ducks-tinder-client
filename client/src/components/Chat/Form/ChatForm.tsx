import { FC, KeyboardEvent, MutableRefObject, useState } from 'react';
import { Socket } from 'socket.io-client';
import { IMessage } from '../../../models/IChat';
import { IUser } from '../../../models/IUser';
import { TextField } from '../../ui';
import styles from './ChatForm.module.scss'

interface ChatFormProps {
  currentUser: IUser
  socket: MutableRefObject<Socket | undefined>;
}

const ChatForm: FC<ChatFormProps> = ({currentUser, socket}) => {

  const [value, setValue] = useState('');

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
  
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <TextField
          type="text"
          variant="low-rounded"
          onKeyDown={(e) => handleKeyDown(e)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          extraClassName={styles.input}
        />
        <button onClick={sendMessage} className={styles.button}>
          send
        </button>
      </div>
    </div>
  );
};

export default ChatForm
