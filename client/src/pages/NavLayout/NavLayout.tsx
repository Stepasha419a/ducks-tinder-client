import { Outlet } from 'react-router-dom';
import { Nav } from '@widgets';
import styles from './NavLayout.module.scss';
import { withPrivatePageHocs } from '@shared/hocs';

export const NavLayout = () => {
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
