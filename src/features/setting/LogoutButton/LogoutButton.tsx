import type { FC, ReactElement } from 'react';
import { Button } from '@shared/ui';
import { useAppDispatch } from '@shared/lib/hooks';
import { logoutThunk } from '@entities/auth/model';
import { disconnectThunk } from '@entities/chat/model';
import styles from './LogoutButton.module.scss';

export const LogoutButton: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
    dispatch(disconnectThunk());
  };

  return (
    <Button onClick={handleLogout} extraClassName={styles.button}>
      Log out
    </Button>
  );
};
