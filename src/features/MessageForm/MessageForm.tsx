import { faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, type FC, memo } from 'react';
import { useForm } from 'react-hook-form';
import { editMessageThunk, sendMessageThunk } from '@entities/chat';
import type { Message } from '@shared/api';
import { useAppDispatch, useAppSelector } from '@shared/lib';
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
  editingMessage: null | Message;
}

export const MessageForm: FC<MessageFormProps> = memo(
  ({ repliedMessage, handleResetEditReplied, editingMessage }) => {
    const dispatch = useAppDispatch();

    const currentUserId = useAppSelector((state) => state.user.currentUser!.id);
    const chat = useAppSelector((state) => state.chat.chat);
    const isChatLoading = useAppSelector((state) => state.chat.isChatLoading);
    const isNotFound = useAppSelector((state) => state.chat.isNotFound);

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
        if (editingMessage) {
          if (editingMessage.text !== trimmedValue) {
            dispatch(
              editMessageThunk({
                messageId: editingMessage.id,
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
      if (editingMessage) {
        setValue('input', editingMessage.text);
      }
    }, [editingMessage, setValue]);

    if (isNotFound) {
      return null;
    }

    if (isChatLoading || !chat) {
      return <MessageFormLazy />;
    }

    if (chat.blocked) {
      const blockedByName =
        chat.blockedById === currentUserId ? 'You' : chat.name;

      return <BlockedChat blockedByName={blockedByName} />;
    }

    const isTopBlock = repliedMessage || editingMessage;
    return (
      <div className={styles.wrapper}>
        {isTopBlock && (
          <TopBlock
            editingMessage={editingMessage}
            repliedMessage={repliedMessage}
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
              icon={editingMessage ? faCheck : faPaperPlane}
            />
          </Button>
        </form>
      </div>
    );
  }
);

MessageForm.displayName = 'MessageForm';
