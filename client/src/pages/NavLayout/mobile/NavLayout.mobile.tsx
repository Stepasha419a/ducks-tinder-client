import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { Nav } from '@/widgets';
import { useIsMobileNavAvailable } from '@/widgets/Nav/lib';
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
