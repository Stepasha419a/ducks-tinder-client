import type { FC, ReactElement } from 'react';
import { disconnectThunk } from '@entities/chat';
import { logoutThunk } from '@entities/user';
import { useAppDispatch } from '@shared/lib/hooks';
import { Button } from '@shared/ui';
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
