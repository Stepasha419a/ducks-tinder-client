import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import ChatsPairsBlock from '../../components/Nav/ChatsPairsBlock/ChatsPairsBlock';
import { ProfileBlock, UserLinks } from './components';
import styles from './Nav.module.scss';

export const Nav = (): ReactElement => {
  const { pathname } = useLocation();

  const [isPairsOpened, setIsPairsOpened] = useState<boolean>(true);

  useEffect(() => {
    setIsPairsOpened(!(pathname === '/chat'));
  }, [pathname]);

  return (
    <aside className={styles.info}>
      <UserLinks />
      {pathname === '/profile' ? (
        <ProfileBlock />
      ) : (
        <ChatsPairsBlock
          isPairsOpened={isPairsOpened}
          setIsPairsOpened={setIsPairsOpened}
        />
      )}
    </aside>
  );
};
