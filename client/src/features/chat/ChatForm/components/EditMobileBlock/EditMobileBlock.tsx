import { useState } from 'react';
import styles from './EditMobileBlock.module.scss';
import { useAppSelector } from '@/shared/lib/hooks';
import { useSelectMessageEdit } from '@/features/chat/lib';

export const EditMobileBlock = () => {
  const currentMessage = useAppSelector((state) => state.chat.currentMessage);
  const currentUsername = useAppSelector(
    (state) => state.user.currentUser.name
  );

  const [editingValue, setEditingValue] = useState(currentMessage?.text);

  const { handleCancelMessage, handleSaveMessage } = useSelectMessageEdit();

  return (
    <>
      <div className={styles.block}>
        <div className={styles.border} />
        <div className={styles.message}>
          <div className={styles.username}>{currentUsername}</div>
          <div className={styles.text}>{currentMessage?.text}</div>
        </div>
        <div onClick={handleCancelMessage} className={styles.close}>
          <div className={styles.mark} />
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.message}>
          <div className={styles.text}>{editingValue}</div>
        </div>
        <div
          onClick={() => handleSaveMessage(editingValue!)}
          className={styles.close}
        >
          <div className={styles.mark} />
        </div>
      </div>
    </>
  );
};
