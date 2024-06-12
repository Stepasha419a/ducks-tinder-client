import { unblockChatThunk } from '@entities/chat/model/chat.thunks';
import { useAppDispatch } from '@shared/lib/hooks';
import { Button } from '@shared/ui';
import styles from './UnblockChat.module.scss';

export const UnblockChat = () => {
  const dispatch = useAppDispatch();

  const handleUnblock = () => {
    dispatch(unblockChatThunk());
  };

  return (
    <Button onClick={handleUnblock} extraClassName={styles.btn}>
      Unblock
    </Button>
  );
};
