import { useSelectMessageEdit } from '@features/chat/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@shared/ui';
import styles from './EditMessage.module.scss';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import type { FC } from 'react';
import type { Message } from '@shared/api/interfaces';

interface EditMessageProps {
  handleStopMessageEditing: () => void;
  selectedMessage: Message | null;
  handleNullSelectedMessage: () => void;
}

export const EditMessage: FC<EditMessageProps> = ({
  handleStopMessageEditing,
  selectedMessage,
  handleNullSelectedMessage,
}) => {
  const { register, handleSubmit, reset } = useForm<{ input: string }>({
    mode: 'onChange',
    defaultValues: { input: selectedMessage?.text },
  });

  const { handleCancelMessage, handleSaveMessage } = useSelectMessageEdit(
    handleStopMessageEditing,
    selectedMessage,
    handleNullSelectedMessage
  );

  const handleSave = handleSubmit((data) => {
    const trimmedValue = data.input.trim();
    if (trimmedValue) {
      handleSaveMessage(trimmedValue);
    }
    reset();
  });

  return (
    <>
      <div className={styles.block}>
        <FontAwesomeIcon
          className={classNames(styles.icon, styles.colored)}
          icon={faPen}
        />
        <div className={styles.message}>
          <div className={styles.title}>Editing</div>
          <div className={styles.text}>{selectedMessage?.text}</div>
        </div>
        <div onClick={handleCancelMessage} className={styles.close}>
          <FontAwesomeIcon className={styles.icon} icon={faXmark} />
        </div>
      </div>
      <div className={styles.block}>
        <TextField
          {...register('input', { required: true })}
          variant="low-rounded"
          extraClassName={styles.input}
        />
        <div className={styles.submit}>
          <FontAwesomeIcon
            onClick={handleSave}
            className={styles.icon}
            icon={faCheck}
          />
        </div>
      </div>
    </>
  );
};
