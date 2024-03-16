import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@shared/ui';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { selectCurrentChat, sendMessageThunk } from '@entities/chat/model';
import { BlockedChat, ReplyBlock } from './components';
import styles from './SendMessageForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface ChatFormValues {
  input: string;
}

export const SendMessageForm = (): ReactElement => {
  const dispatch = useAppDispatch();

  const currentChat = useAppSelector(selectCurrentChat);
  const repliedMessage = useAppSelector((state) => state.chat.repliedMessage);
  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);

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

  if (currentChat?.blocked) {
    const blockedByName =
      currentChat.blockedById === currentUserId ? 'You' : currentChat.name;

    return <BlockedChat blockedByName={blockedByName} />;
  }

  return (
    <div className={styles.wrapper}>
      {repliedMessage && <ReplyBlock />}
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
          <FontAwesomeIcon className={styles.icon} icon={faPaperPlane} />
        </Button>
      </form>
    </div>
  );
};
