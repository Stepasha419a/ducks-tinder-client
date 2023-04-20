import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@shared/ui';
import { useAppDispatch } from '@hooks';
import { sendMessageThunk } from '@entities/chat/model';
import styles from './ChatForm.module.scss';

interface ChatFormValues {
  input: string;
}

export const ChatForm = (): ReactElement => {
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ChatFormValues>({ mode: 'onChange' });

  const sendMessage = handleSubmit((data) => {
    const trimmedValue = data.input.trim();
    if (trimmedValue) {
      dispatch(sendMessageThunk(trimmedValue));
    }
    reset();
  });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={sendMessage} className={styles.form}>
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