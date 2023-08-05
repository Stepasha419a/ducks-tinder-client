import { Outlet } from 'react-router-dom';
import { Nav } from '@widgets';
import { withPrivatePageHocs } from '@hocs';
import styles from './NavLayout.module.scss';
import { useMediaQuery } from '@/shared/lib/hooks';

export const NavLayout = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  return (
    <div className={styles.main}>
      {isMobile ? (
        <>
          <div className={styles.content}>
            <Outlet />
          </div>
          <Nav isMobile />
        </>
      ) : (
        <>
          <Nav />
          <div className={styles.content}>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default withPrivatePageHocs(NavLayout);
