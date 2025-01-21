import { Button } from '@ducks-tinder-client/ui';
import type { FC, ReactElement } from 'react';
import { disconnectThunk, resetChatSlice } from '@entities/chat';
import {
  logoutThunk,
  resetPairSlice,
  resetTinderSlice,
  resetUserSlice,
} from '@entities/user';
import { useAppDispatch } from '@shared/lib';
import styles from './LogoutButton.module.scss';

export const LogoutButton: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
    dispatch(disconnectThunk());
    dispatch(resetChatSlice());
    dispatch(resetUserSlice());
    dispatch(resetTinderSlice());
    dispatch(resetPairSlice());
  };

  return (
    <Button onClick={handleLogout} extraClassName={styles.button}>
      Log out
    </Button>
  );
};
