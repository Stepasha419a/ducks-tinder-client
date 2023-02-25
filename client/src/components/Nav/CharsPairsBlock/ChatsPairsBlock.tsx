import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavPair from './PairsInfo/NavPair';
import Chats from './Chats/Chats';
import styles from './ChatsPairsBlock.module.scss';

const ChatsPairsBlock = () => {
  const pathname = useLocation().pathname;

  useEffect(() => {
    pathname === '/chat' ? setIsPairsOpened(false) : setIsPairsOpened(true);
  }, [pathname]);

  const [isPairsOpened, setIsPairsOpened] = useState<boolean>(true);

  return (
    <>
      <div className={styles.titles}>
        <Link
          onClick={() => setIsPairsOpened(true)}
          className={`${styles.title} ${
            isPairsOpened ? styles.title_active : ''
          }`}
          to="/"
        >
          Pairs
        </Link>
        <Link
          onClick={() => setIsPairsOpened(false)}
          className={`${styles.title} ${
            !isPairsOpened ? styles.title_active : ''
          }`}
          to="/chat"
        >
          Messages
        </Link>
      </div>
      <div className={styles.content}>
        {isPairsOpened ? <NavPair /> : <Chats />}
      </div>
    </>
  );
};

export default ChatsPairsBlock;
