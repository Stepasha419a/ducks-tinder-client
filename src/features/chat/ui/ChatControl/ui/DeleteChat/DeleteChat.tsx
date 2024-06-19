import type { FC } from 'react';
import { useState } from 'react';
import { deleteChatThunk } from '@entities/chat';
import { useAppDispatch } from '@shared/lib/hooks';
import { Button, Popup } from '@shared/ui';
import styles from './DeleteChat.module.scss';

interface DeleteChatProps {
  submitDelete?: () => void;
}

export const DeleteChat: FC<DeleteChatProps> = ({ submitDelete }) => {
  const dispatch = useAppDispatch();

  const [isChatDeleting, setIsChatDeleting] = useState(false);

  const handleDelete = () => {
    dispatch(deleteChatThunk());
    submitDelete?.();
  };

  return (
    <>
      <Button
        onClick={() => setIsChatDeleting(true)}
        extraClassName={styles.btn}
      >
        Delete
      </Button>
      {isChatDeleting && (
        <Popup
          extraClassName={styles.overflow}
          closeHandler={() => setIsChatDeleting(false)}
          size="s"
        >
          <div className={styles.title}>Delete</div>
          <div className={styles.descr}>
            <div className={styles.text}>Are you sure to delete this chat?</div>
            <div className={styles.attention}>
              It will not be available to recover it!
            </div>
          </div>
          <div className={styles.wrapper}>
            <Button
              onClick={() => setIsChatDeleting(false)}
              extraClassName={styles.btn}
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} extraClassName={styles.btn}>
              Delete
            </Button>
          </div>
        </Popup>
      )}
    </>
  );
};
