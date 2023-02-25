import { useLocation } from 'react-router-dom';
import styles from './Nav.module.scss';
import Links from './Links/Links';
import ChatsPairsBlock from './CharsPairsBlock/ChatsPairsBlock';
import ProfileBlock from './ProfileBlock/ProfileBlock';

const Nav = () => {
  const pathname = useLocation().pathname;

  return (
    <aside className={styles.info}>
      <Links pathname={pathname} />
      {pathname === '/profile' ? (
        <ProfileBlock />
      ) : (
        <ChatsPairsBlock />
      )}
    </aside>
  );
};

export default Nav;
