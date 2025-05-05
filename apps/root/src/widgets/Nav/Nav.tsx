import type { FC, ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';

import { NavBlockEnum, useNavBlock } from './lib';
import { NavBlock, NavMobile, UserLinks } from './ui';
import styles from './Nav.module.scss';

interface NavProps {
  isMobile?: boolean;
}

export const Nav: FC<NavProps> = ({ isMobile }): ReactElement => {
  const navBlock = useNavBlock();

  if (isMobile) {
    return <NavMobile />;
  }

  return (
    <aside className={styles.nav}>
      <UserLinks isProfilePage={navBlock === NavBlockEnum.Setting} />
      <AnimatePresence initial={false} mode="wait">
        <NavBlock navBlock={navBlock} />
      </AnimatePresence>
    </aside>
  );
};
