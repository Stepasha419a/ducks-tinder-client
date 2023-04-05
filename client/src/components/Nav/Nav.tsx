import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import styles from './Nav.module.scss';
import Links from './Links/Links';
import ChatsPairsBlock from './CharsPairsBlock/ChatsPairsBlock';
import ProfileBlock from './ProfileBlock/ProfileBlock';

const Nav = (): ReactElement => {
  const { pathname } = useLocation();

  const [isPairsOpened, setIsPairsOpened] = useState<boolean>(true);

  useEffect(() => {
    setIsPairsOpened(!(pathname === '/chat'));
  }, [pathname]);

  return (
    <aside className={styles.info}>
      <Links pathname={pathname} />
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

export default Nav;
