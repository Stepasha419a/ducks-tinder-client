import { Outlet } from 'react-router-dom';
import styles from './Settings.module.scss';

export const SettingsPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;
