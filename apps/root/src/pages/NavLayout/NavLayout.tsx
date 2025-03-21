import {
  WithHocSubscription,
  useAdaptiveMediaQuery,
} from '@ducks-tinder-client/common';
import { Outlet } from 'react-router-dom';
import { Nav } from '@widgets/Nav';
import { privateHocComposition } from '@shared/lib';
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

export default WithHocSubscription(privateHocComposition, NavLayout);
