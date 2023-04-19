import type { FC } from 'react';
import { useAppDispatch } from '@hooks';
import { Button } from '@shared/ui';
import { createChatThunk } from '@entities/chat/model';
import { deletePairThunk } from '@entities/user/model';
import styles from './AcceptPair.module.scss';

export const AcceptPair: FC = () => {
  const dispatch = useAppDispatch();

  const handleAccept = (): void => {
    dispatch(createChatThunk());
    dispatch(deletePairThunk());
  };

  return (
    <Button onClick={() => handleAccept()} extraClassName={styles.btn}>
      Accept
    </Button>
  );
};
