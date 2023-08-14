import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@shared/ui';
import {
  useAppDispatch,
  useAppSelector,
  useMediaQuery,
} from '@shared/lib/hooks';
import { selectRepliedMessage, sendMessageThunk } from '@entities/chat/model';
import styles from './ChatForm.module.scss';
import { BlockedChat, EditMobileBlock, ReplyBlock } from './components';

interface ChatFormValues {
  input: string;
}

export const ChatForm = (): ReactElement => {
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery('(max-width: 900px)');

  const { currentChatUserObj, currentChat } =
    useAppSelector(selectRepliedMessage);
  const repliedMessage = useAppSelector((state) => state.chat.repliedMessage);
  const isMessageEditing = useAppSelector(
    (state) => state.chat.isMessageEditing
  );

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
      currentChat.blockedById === currentChatUserObj.id
        ? 'You'
        : currentChat.users[0].name;

    return <BlockedChat blockedByName={blockedByName} />;
  }

  const isMessageEditingMobile = isMessageEditing && isMobile;

  if (isMessageEditingMobile) {
    return <EditMobileBlock />;
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
          send
        </Button>
      </form>
    </div>
  );
};
