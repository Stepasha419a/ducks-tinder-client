import type { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import * as styles from './ProfilePage.module.scss';

const ProfilePage: FC = (): ReactElement => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

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
