import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { selectCurrentChat, sendMessageThunk } from '@entities/chat';
import type { Message } from '@shared/api/interfaces';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { Button, TextField } from '@shared/ui';
import { BlockedChat, ReplyBlock } from './components';
import styles from './SendMessageForm.module.scss';

interface ChatFormValues {
  input: string;
}

interface SendMessageFormProps {
  repliedMessage: Message | null;
  setRepliedMessage: Dispatch<SetStateAction<Message | null>>;
}

export const SendMessageForm: FC<SendMessageFormProps> = ({
  repliedMessage,
  setRepliedMessage,
}) => {
  const dispatch = useAppDispatch();

  const currentChat = useAppSelector(selectCurrentChat);
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
      dispatch(sendMessageThunk({ text: trimmedValue, repliedMessage }));
      setRepliedMessage(null);
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
      {repliedMessage && (
        <ReplyBlock
          setRepliedMessage={setRepliedMessage}
          repliedMessage={repliedMessage}
        />
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
          <FontAwesomeIcon className={styles.icon} icon={faPaperPlane} />
        </Button>
      </form>
    </div>
  );
};
