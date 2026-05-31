import type { FC, ReactElement } from 'react';

import { resetUserSlice, useAppDispatch } from '@ducks-tinder-client/common';
import { Button } from '@ducks-tinder-client/ui';

import { resetPairSlice, resetTinderSlice } from '@entities/user';

import * as styles from './LogoutButton.module.scss';
import { useTranslation } from 'react-i18next';
import { useChatSliceReset } from 'chatApp/hooks';
import { useLogoutMutation } from '@ducks-tinder-client/auth';

export const LogoutButton: FC = (): ReactElement => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { mutateAsync } = useLogoutMutation();

  const { handleResetChatSlice } = useChatSliceReset();

  const handleLogout = () => {
    mutateAsync();

    handleResetChatSlice();
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
