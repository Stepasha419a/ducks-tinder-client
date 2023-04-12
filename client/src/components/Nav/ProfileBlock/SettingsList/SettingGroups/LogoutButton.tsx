import type { ReactElement } from 'react';
import { useAppDispatch } from '@hooks';
import { logoutThunk } from '@entities/auth/model';
import styles from '../SettingsList.module.scss';

export const LoggoutButton = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.group}>
      <div className={styles.items}>
        <div
          onClick={async () => dispatch(logoutThunk())}
          className={`${styles.item} ${styles.pointer} ${styles.border}`}
        >
          <div className={styles.descr}>
            <div className={`${styles.title} ${styles.center}`}>Log out</div>
          </div>
        </div>
      </div>
    </div>
  );
};
