import type { FC, ReactElement } from 'react';
import { Button } from '@shared/ui';
import { useAppDispatch } from '@shared/lib/hooks';
import { logoutThunk } from '@entities/auth/model';
import styles from './LogoutButton.module.scss';

export const LogoutButton: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={async () => dispatch(logoutThunk())}
      extraClassName={styles.button}
    >
      Log out
    </Button>
  );
};
