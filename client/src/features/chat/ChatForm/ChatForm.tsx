import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Button, TextField } from '@shared/ui';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
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

  const chatRepliedMember = currentChat?.users.find(
    (user) => user.id === repliedMessage?.userId
  );
  const isOwnReplied = repliedMessage?.userId === currentChatUserObj.id;
  const repliedName = isOwnReplied
    ? currentChatUserObj.name
    : chatRepliedMember?.name;

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

  if (currentChat?.blocked) {
    const blockedByName =
      currentChat.blockedById === currentChatUserObj.id
        ? 'You'
        : currentChat.users[0].name;

    return (
      <div className={styles.wrapper}>
        <div className={styles.blocked}>
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
          <div className={styles.descr}>
            <span className={styles.name}>{blockedByName}</span>
            <span className={styles.text}>blocked this chat</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {repliedMessage && (
        <div className={styles.reply}>
          <div className={styles.border} />
          <div className={styles.message}>
            <div className={styles.username}>{repliedName}</div>
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
