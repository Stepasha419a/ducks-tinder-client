import { FC, KeyboardEvent, useState } from 'react';
import { IMessage } from '../../../models/IChat';
import { IUser } from '../../../models/IUser';
import { useAppSelector } from '../../../redux/store';
import { Button, TextField } from '../../ui';
import styles from './ChatForm.module.scss';

interface ChatFormProps {
  currentUser: IUser;
}

const ChatForm: FC<ChatFormProps> = ({ currentUser }) => {
  const socket = useAppSelector((state) => state.chatPage.socket);

  const [value, setValue] = useState('');

  const sendMessage = async () => {
    const message: IMessage = {
      id: Date.now().toString(),
      username: currentUser.name,
      content: value,
      userId: currentUser._id,
    };
    socket!.send(message);
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
        <Button
          onClick={sendMessage}
          variant="default"
          extraClassName={styles.button}
        >
          send
        </Button>
      </div>
    </div>
  );
};

export default ChatForm;
