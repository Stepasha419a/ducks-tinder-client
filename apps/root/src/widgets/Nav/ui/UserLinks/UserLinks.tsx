import { type FC, memo } from 'react';
import { Link } from 'react-router-dom';
import {
  faBriefcase,
  faFeather,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { selectAvatar, useAppSelector } from '@ducks-tinder-client/common';
import { Avatar } from '@ducks-tinder-client/ui';

import { variants } from './UserLinks.variants';
import styles from './UserLinks.module.scss';

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
              <FontAwesomeIcon icon={faFeather} />
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
