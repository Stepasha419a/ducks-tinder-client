import { useLocation } from 'react-router-dom';
import styles from './Nav.module.scss';
import Links from './Links/Links';
import ChatsPairsBlock from './CharsPairsBlock/ChatsPairsBlock';
import ProfileBlock from './ProfileBlock/ProfileBlock';
import { useEffect, useState } from 'react';

const Nav = () => {
  const pathname = useLocation().pathname;

  const [isPairsOpened, setIsPairsOpened] = useState<boolean>(true);

  useEffect(() => {
    pathname === '/chat' ? setIsPairsOpened(false) : setIsPairsOpened(true);
  }, [pathname]);

  return (
    <aside className={styles.info}>
      <Links pathname={pathname} />
      {pathname === '/profile' ? (
        <ProfileBlock />
      ) : (
        <ChatsPairsBlock isPairsOpened={isPairsOpened} setIsPairsOpened={setIsPairsOpened} />
      )}
    </aside>
  );
};

export default Nav;
