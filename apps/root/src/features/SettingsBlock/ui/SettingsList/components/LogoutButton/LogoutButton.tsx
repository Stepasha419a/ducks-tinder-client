import type { FC, ReactElement } from 'react';

import {
  disconnectThunk,
  logoutThunk,
  resetChatSlice,
  resetUserSlice,
  useAppDispatch,
} from '@ducks-tinder-client/common';
import { Button } from '@ducks-tinder-client/ui';

import { resetPairSlice, resetTinderSlice } from '@entities/user';

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
