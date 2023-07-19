import { Outlet } from 'react-router-dom';
import { Nav } from '@widgets';
import { withPrivatePageHocs } from '@hocs';
import styles from './NavLayout.module.scss';

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
