import { Outlet } from 'react-router-dom';

import {
  useAdaptiveMediaQuery,
  WithHocSubscription,
} from '@ducks-tinder-client/common';

import { Nav } from '@widgets/Nav';
import { privateHocComposition } from '@shared/lib';

import { NavLayoutMobile } from './ui';
import * as styles from './NavLayout.module.scss';

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
