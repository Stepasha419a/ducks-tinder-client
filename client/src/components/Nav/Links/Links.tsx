import type { FC } from 'react';
import {
  faBriefcase,
  faFireFlameCurved,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { Avatar } from '../../../shared/ui';
import styles from './Links.module.scss';

interface LinksProps {
  pathname: string;
}

const Links: FC<LinksProps> = ({ pathname }) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  return (
    <div className={styles.links}>
      {pathname === '/profile' ? (
        <Link className={`${styles.mainLink} ${styles.main}`} to="/">
          <FontAwesomeIcon icon={faFireFlameCurved} />
        </Link>
      ) : (
        <Link className={`${styles.mainLink} ${styles.person}`} to="/profile">
          <Avatar
            userId={currentUser._id}
            avatarUrl={currentUser.pictures.avatar}
          />
          <div className={styles.name}>{currentUser.name}</div>
        </Link>
      )}
      <div className={`${styles.wrapper} ${styles.review}`}>
        <Link className={styles.link} to="#">
          <FontAwesomeIcon icon={faBriefcase} />
        </Link>
      </div>
      <div className={`${styles.wrapper} ${styles.work}`}>
        <Link className={styles.link} to="#">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>
      </div>
    </div>
  );
};

export default Links;
