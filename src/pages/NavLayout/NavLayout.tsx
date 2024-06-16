import { Outlet } from 'react-router-dom';
import { Nav } from '@widgets';
import { withPrivatePageHocs } from '@features/lib';
import { useAdaptiveMediaQuery } from '@shared/lib/hooks';
import styles from './NavLayout.module.scss';
import { NavLayoutMobile } from './ui';

export const NavLayout = () => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

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
