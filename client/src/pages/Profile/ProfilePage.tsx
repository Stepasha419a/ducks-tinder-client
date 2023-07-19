import type { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './ProfilePage.module.scss';

const ProfilePage: FC = (): ReactElement => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
