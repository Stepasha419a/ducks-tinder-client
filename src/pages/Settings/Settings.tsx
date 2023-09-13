import { Outlet } from 'react-router-dom';
import styles from './Settings.module.scss';
import { useMediaQuery } from '@shared/lib/hooks';

export const SettingsPage = () => {
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

export default SettingsPage;
