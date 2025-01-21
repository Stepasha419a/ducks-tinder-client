import { Avatar } from '@ducks-tinder-client/ui';
import {
  faBriefcase,
  faFireFlameCurved,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, type FC } from 'react';
import { Link } from 'react-router-dom';
import { selectAvatar } from '@entities/user';
import { useAppSelector } from '@shared/lib';
import styles from './UserLinks.module.scss';
import { variants } from './UserLinks.variants';

interface UserLinksProps {
  isProfilePage: boolean;
}

export const UserLinks: FC<UserLinksProps> = memo(({ isProfilePage }) => {
  const { avatarName, currentUserName } = useAppSelector(selectAvatar);

  return (
    <div className={styles.links}>
      <AnimatePresence initial={false} mode="wait">
        {isProfilePage ? (
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
              <Avatar avatarUrl={avatarName} />
              <div className={styles.name}>{currentUserName}</div>
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
});
