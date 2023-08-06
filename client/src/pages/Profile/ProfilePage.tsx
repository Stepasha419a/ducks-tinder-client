import type { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@/shared/lib/hooks';
import styles from './ProfilePage.module.scss';

const ProfilePage: FC = (): ReactElement => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return (
      <div className={styles.wrapper}>
        <Outlet />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
