import { Outlet } from 'react-router-dom';
import { Nav } from '@widgets';
import { withPrivatePageHocs } from '@hocs';
import styles from './NavLayout.module.scss';
import { useMediaQuery } from '@/shared/lib/hooks';
import { NavLayoutMobile } from './mobile/NavLayout.mobile';

export const NavLayout = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return <NavLayoutMobile />;
  }

  return (
    <div className={styles.main}>
      <Nav />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default withPrivatePageHocs(NavLayout);
