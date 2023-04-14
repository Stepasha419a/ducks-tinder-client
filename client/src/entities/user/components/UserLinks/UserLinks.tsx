import { Link, useLocation } from 'react-router-dom';
import {
  faBriefcase,
  faFireFlameCurved,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@shared/ui';
import { useAppSelector } from '@hooks';
import styles from './UserLinks.module.scss';
import classNames from 'classnames';

export const UserLinks = () => {
  const { pathname } = useLocation();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  //TODO: relocate it into Nav widget ui folder, when it'll be ready for it (leave only user avatar&name)
  return (
    <div className={styles.links}>
      {pathname === '/profile' ? (
        <Link className={classNames(styles.mainLink, styles.main)} to="/">
          <FontAwesomeIcon icon={faFireFlameCurved} />
        </Link>
      ) : (
        <Link
          className={classNames(styles.mainLink, styles.person)}
          to="/profile"
        >
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
