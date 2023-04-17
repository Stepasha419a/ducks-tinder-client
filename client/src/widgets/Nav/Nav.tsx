import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileBlock, UserLinks, ChatsPairsBlock } from './components';
import styles from './Nav.module.scss';

export const Nav = (): ReactElement => {
  const { pathname } = useLocation();

  return (
    <aside className={styles.info}>
      <UserLinks />
      {pathname === '/profile' ? <ProfileBlock /> : <ChatsPairsBlock />}
    </aside>
  );
};
