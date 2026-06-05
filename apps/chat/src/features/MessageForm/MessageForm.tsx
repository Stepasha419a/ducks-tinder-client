import { type FC, memo, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, TextField } from '@ducks-tinder-client/ui';

import { MessageFormLazy } from './MessageForm.lazy';
import { BlockedChat, TopBlock } from './ui';
import * as styles from './MessageForm.module.scss';
import { useTranslation } from 'react-i18next';
import type { Message } from '@shared/api';
import { useChatDispatch, useChatSelector } from '@shared/lib/hooks';
import { editMessageThunk, sendMessageThunk } from '@entities/chat';
import { useUserStore } from '@ducks-tinder-client/auth';

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
    const userId = useUserStore((state) => state.currentUser?.id);

    const { t } = useTranslation('chat');

    const dispatch = useChatDispatch();

    const activeChat = useChatSelector((state) => state.chat.activeChat);
    const isChatLoading = useChatSelector((state) => state.chat.isChatLoading);
    const isNotFound = useChatSelector((state) => state.chat.isNotFound);

    const prevInputRef = useRef('');

    const {
      register,
      formState: { isValid },
      handleSubmit,
      setValue,
      reset,
      getValues,
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

    useEffect(
      () => () => {
        prevInputRef.current = '';
        setValue('input', '');
        handleResetEditReplied();
      },
      [activeChat?.id, handleResetEditReplied, setValue]
    );

    useEffect(() => {
      if (editingMessage) {
        prevInputRef.current = getValues('input');
        setValue('input', editingMessage.text);
      } else {
        setValue('input', prevInputRef.current);
      }
    }, [editingMessage, getValues, setValue]);

    if (isNotFound) {
      return null;
    }

    if (isChatLoading || !activeChat) {
      return <MessageFormLazy />;
    }

    if (activeChat.blocked) {
      const blockedByName =
        userId && activeChat.blockedById === userId
          ? t('you')
          : activeChat.name;

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
