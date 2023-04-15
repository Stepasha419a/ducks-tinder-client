import type { ReactElement } from 'react';
import { useAppDispatch } from '@hooks';
import { logoutThunk } from '@entities/auth/model';
import { SettingGroup } from '@shared/ui';
import styles from './SettingsGroup.module.scss';

export const LogoutButton = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <SettingGroup>
      <div
        onClick={async () => dispatch(logoutThunk())}
        className={`${styles.item} ${styles.pointer} ${styles.border}`}
      >
        <div className={styles.descr}>
          <div className={`${styles.title} ${styles.center}`}>Log out</div>
        </div>
      </div>
    </SettingGroup>
  );
};
