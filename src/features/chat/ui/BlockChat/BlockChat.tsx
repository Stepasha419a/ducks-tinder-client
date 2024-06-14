import { blockChatThunk } from '@entities/chat';
import { useAppDispatch } from '@shared/lib/hooks';
import { Button } from '@shared/ui';
import styles from './BlockChat.module.scss';

export const BlockChat = () => {
  const dispatch = useAppDispatch();

  const handleBlock = () => {
    dispatch(blockChatThunk());
  };

  return (
    <Button onClick={handleBlock} extraClassName={styles.btn}>
      Block
    </Button>
  );
};