import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import {
  faBriefcase,
  faFireFlameCurved,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@shared/ui';
import { useAppSelector } from '@hooks';
import { variants } from './UserLinks.variants';
import styles from './UserLinks.module.scss';

export const UserLinks = () => {
  const { pathname } = useLocation();

  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <div className={styles.links}>
      <AnimatePresence initial={false}>
        {pathname === '/profile' ? (
          <motion.div
            key="main-link"
            variants={variants}
            initial={'scaleIn'}
            animate={'scaleOut'}
            transition={{ duration: 0.1 }}
          >
            <Link className={classNames(styles.mainLink, styles.main)} to="/">
              <FontAwesomeIcon icon={faFireFlameCurved} />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="profile-link"
            variants={variants}
            initial={'scaleIn'}
            animate={'scaleOut'}
            transition={{ duration: 0.1 }}
          >
            <Link
              className={classNames(styles.mainLink, styles.person)}
              to="/profile"
            >
              <Avatar
                userId={currentUser.id}
                avatarUrl={currentUser.pictures[0]?.name}
              />
              <div className={styles.name}>{currentUser.name}</div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
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
