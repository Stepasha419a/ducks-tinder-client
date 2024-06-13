import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import { Nav } from '@widgets';
import { useIsMobileNavAvailable } from '../../lib';
import styles from './NavLayout.mobile.module.scss';

export const NavLayoutMobile = () => {
  const isMobileNav = useIsMobileNavAvailable();

  return (
    <div className={styles.main}>
      <div className={classNames(styles.content, isMobileNav && styles.isNav)}>
        <Outlet />
      </div>
      {isMobileNav && <Nav isMobile />}
    </div>
  );
};
