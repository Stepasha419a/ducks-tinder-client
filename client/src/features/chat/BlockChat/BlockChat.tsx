import { Button } from '@shared/ui';
import { useAppDispatch } from '@shared/hooks';
import { blockChatThunk } from '@entities/chat/model/chat.thunks';
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
