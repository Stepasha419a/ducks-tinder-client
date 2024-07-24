import { faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  editMessageThunk,
  selectCurrentChat,
  sendMessageThunk,
} from '@entities/chat';
import type { Message } from '@shared/api/interfaces';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { Button, TextField } from '@shared/ui';
import { MessageFormLazy } from './MessageForm.lazy';
import styles from './MessageForm.module.scss';
import { BlockedChat, TopBlock } from './ui';

interface ChatFormValues {
  input: string;
}

interface MessageFormProps {
  repliedMessage: Message | null;
  handleResetEditReplied: () => void;
  selectedMessage: null | Message;
  isMessageEditing: boolean;
}

export const MessageForm: FC<MessageFormProps> = ({
  repliedMessage,
  handleResetEditReplied,
  selectedMessage,
  isMessageEditing,
}) => {
  const dispatch = useAppDispatch();

  const currentChat = useAppSelector(selectCurrentChat);
  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);
  const chat = useAppSelector((state) => state.chat.chat);
  const isChatLoading = useAppSelector((state) => state.chat.isChatLoading);

  const {
    register,
    formState: { isValid },
    handleSubmit,
    setValue,
    reset,
  } = useForm<ChatFormValues>({ mode: 'onChange' });

  const submitForm = handleSubmit((data) => {
    const trimmedValue = data.input.trim();
    if (trimmedValue) {
      if (isMessageEditing && selectedMessage) {
        if (selectedMessage.text !== trimmedValue) {
          dispatch(
            editMessageThunk({
              messageId: selectedMessage.id,
              text: trimmedValue,
            })
          );
        }
      } else {
        dispatch(sendMessageThunk({ text: trimmedValue, repliedMessage }));
      }
    }
    handleResetEditReplied();
    reset();
  });

  useEffect(() => {
    if (isMessageEditing && selectedMessage) {
      setValue('input', selectedMessage.text);
    }
  }, [isMessageEditing, selectedMessage, setValue]);

  if (isChatLoading || !chat) {
    return <MessageFormLazy />;
  }

  if (currentChat?.blocked) {
    const blockedByName =
      currentChat.blockedById === currentUserId ? 'You' : currentChat.name;

    return <BlockedChat blockedByName={blockedByName} />;
  }

  const isTopBlock = repliedMessage || (isMessageEditing && selectedMessage);
  return (
    <div className={styles.wrapper}>
      {isTopBlock && (
        <TopBlock
          isMessageEditing={isMessageEditing}
          repliedMessage={repliedMessage}
          selectedMessage={selectedMessage}
          cancelTopBlock={handleResetEditReplied}
        />
      )}
      <form onSubmit={submitForm} className={styles.form}>
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
          <FontAwesomeIcon
            className={styles.icon}
            icon={isMessageEditing ? faCheck : faPaperPlane}
          />
        </Button>
      </form>
    </div>
  );
};
