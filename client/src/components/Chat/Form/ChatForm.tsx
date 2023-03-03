import { KeyboardEvent, useState } from 'react';
import { sendMessageThunk } from '../../../redux/chat/chat.thunks';
import { useAppDispatch } from '../../../redux/store';
import { Button, TextField } from '../../ui';
import styles from './ChatForm.module.scss';

const ChatForm = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');

  const setValueHandler = (value: string) => {
    const validatedValue = value.replace(/\s+/g, ' ');
    setValue(validatedValue);
  };

  const sendMessage = async () => {
    if (value.trim()) {
      dispatch(sendMessageThunk(value.trim()));
      setValueHandler('');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && value) {
      value.length && sendMessage();
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
          onChange={(e) => setValueHandler(e.target.value)}
          extraClassName={styles.input}
        />
        {value.trim().length ? (
          <Button
            onClick={sendMessage}
            extraClassName={styles.button}
          >
            send
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ChatForm;
