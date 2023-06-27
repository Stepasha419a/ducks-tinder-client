import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@shared/ui';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  selectRepliedMessage,
  sendMessageThunk,
  setRepliedMessage,
} from '@entities/chat/model';
import styles from './ChatForm.module.scss';

interface ChatFormValues {
  input: string;
}

export const ChatForm = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { currentChatUserObj, currentChat } =
    useAppSelector(selectRepliedMessage);
  const repliedMessage = useAppSelector((state) => state.chat.repliedMessage);

  const chatMember = currentChat?.users.find(
    (user) => user.id === repliedMessage?.userId
  );
  const isOwn = repliedMessage?.userId === currentChatUserObj._id;
  const name = isOwn ? currentChatUserObj.name : chatMember?.name;

  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ChatFormValues>({ mode: 'onChange' });

  const handleSendMessage = handleSubmit((data) => {
    const trimmedValue = data.input.trim();
    if (trimmedValue) {
      dispatch(sendMessageThunk(trimmedValue));
    }
    reset();
  });

  const handleCancelReplying = () => {
    dispatch(setRepliedMessage(null));
  };

  return (
    <div className={styles.wrapper}>
      {repliedMessage && (
        <div className={styles.reply}>
          <div className={styles.border} />
          <div className={styles.message}>
            <div className={styles.username}>{name}</div>
            <div className={styles.text}>{repliedMessage.text}</div>
          </div>
          <div onClick={handleCancelReplying} className={styles.close}>
            <div className={styles.mark} />
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className={styles.form}>
        <TextField
          {...register('input', { required: true })}
          variant="low-rounded"
          extraClassName={styles.input}
        />
        <Button
          disabled={!isValid}
          type="submit"
          extraClassName={styles.button}
        >
          send
        </Button>
      </form>
    </div>
  );
};
