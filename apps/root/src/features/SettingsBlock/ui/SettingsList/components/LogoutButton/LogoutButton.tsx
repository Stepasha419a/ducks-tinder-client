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

import * as styles from './LogoutButton.module.scss';
import { useTranslation } from 'react-i18next';

export const LogoutButton: FC = (): ReactElement => {
  const { t } = useTranslation();

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
      {t('profile.logout')}
    </Button>
  );
};
