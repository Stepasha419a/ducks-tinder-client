import type { FC } from 'react';
import { deletePairThunk } from '@/entities/user/model';
import { useAppDispatch } from '@hooks';
import { Button } from '@shared/ui';
import styles from './RefusePair.module.scss';

export const RefusePair: FC = () => {
  const dispatch = useAppDispatch();

  const handleRefuse = (): void => {
    dispatch(deletePairThunk());
  };

  return (
    <Button onClick={() => handleRefuse()} extraClassName={styles.btn}>
      Refuse
    </Button>
  );
};
