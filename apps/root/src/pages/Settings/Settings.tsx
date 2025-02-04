import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import { Outlet } from 'react-router-dom';
import styles from './Settings.module.scss';

export const SettingsPage = () => {
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

export default SettingsPage;
