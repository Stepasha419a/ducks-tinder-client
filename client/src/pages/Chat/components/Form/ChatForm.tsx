import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '../../../../shared/ui';
import { useAppDispatch } from '../../../../hooks';
import { sendMessageThunk } from '../../../../redux/chat/chat.thunks';
import styles from './ChatForm.module.scss';

export const ChatForm = (): ReactElement => {
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' });

  const sendMessage = handleSubmit((data) => {
    if (data.input.trim()) {
      dispatch(sendMessageThunk(data.input.trim()));
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
