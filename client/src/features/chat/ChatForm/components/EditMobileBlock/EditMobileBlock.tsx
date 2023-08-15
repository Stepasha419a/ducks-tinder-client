import { useState } from 'react';
import { useAppSelector } from '@/shared/lib/hooks';
import { useSelectMessageEdit } from '@/features/chat/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@/shared/ui';
import styles from './EditMobileBlock.module.scss';
import classNames from 'classnames';

export const EditMobileBlock = () => {
  const currentMessage = useAppSelector((state) => state.chat.currentMessage);

  const [editingValue, setEditingValue] = useState(currentMessage?.text);

  const { handleCancelMessage, handleSaveMessage } = useSelectMessageEdit();

  return (
    <>
      <div className={styles.block}>
        <FontAwesomeIcon className={classNames(styles.icon, styles.colored)} icon={faPen} />
        <div className={styles.message}>
          <div className={styles.title}>Editing</div>
          <div className={styles.text}>{currentMessage?.text}</div>
        </div>
        <div onClick={handleCancelMessage} className={styles.close}>
          <FontAwesomeIcon className={styles.icon} icon={faXmark} />
        </div>
      </div>
      <div className={styles.block}>
        <TextField
          value={editingValue}
          variant="low-rounded"
          onChange={(e) => setEditingValue(e.target.value)}
          extraClassName={styles.input}
        />
        <div className={styles.submit}>
          <FontAwesomeIcon
            onClick={() => handleSaveMessage(editingValue!)}
            className={styles.icon}
            icon={faCheck}
          />
        </div>
      </div>
    </>
  );
};
