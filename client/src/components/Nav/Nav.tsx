import {
  faBriefcase,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Chats from './Chats/Chats';
import { MutableRefObject } from 'react';
import { Socket } from 'socket.io-client';
import styles from './Nav.module.scss';
import NavPair from './PairsInfo/NavPair';
import Avatar from '../Avatar/Avatar';
import { useAppSelector } from '../../redux/reduxStore';

interface NavPropsInterface {
  isPairsOpened: boolean;
  setIsPairsOpened: (setting: boolean) => void;
  socket: MutableRefObject<Socket | undefined>;
}

const Nav: React.FC<NavPropsInterface> = ({
  isPairsOpened,
  setIsPairsOpened,
  socket,
}) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  return (
    <aside className={styles.info}>
      <div className={styles.user}>
        <Link className={styles.person} to="/profile">
          <Avatar />
          <div className={styles.name}>{currentUser.name}</div>
        </Link>
        <div className={styles.review}>
          <Link className={styles.link} to="#">
            <FontAwesomeIcon icon={faBriefcase} />
          </Link>
        </div>
        <div className={styles.work}>
          <Link className={styles.link} to="#">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </div>
      </div>
      <div>
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
          {isPairsOpened ? <NavPair /> : <Chats socket={socket} />}
        </div>
      </div>
    </aside>
  );
};

export default Nav;
