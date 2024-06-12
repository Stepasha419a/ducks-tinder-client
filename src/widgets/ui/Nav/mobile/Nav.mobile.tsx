import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import {
  faComments,
  faFireFlameCurved,
  faStar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { ROUTES } from '@shared/lib/constants';
import { useAppSelector } from '@shared/lib/hooks';
import styles from './Nav.mobile.module.scss';
import { getIsProfilePage } from '@widgets/lib';
import { getIsChatPage } from '@entities/chat/lib';

export const NavMobile = () => {
  const { pathname } = useLocation();
  const activePath = pathname.split('/')[1];

  const newMessageChatsCount = useAppSelector(
    (state) => state.chat.newMessagesCount
  );

  const isLoadedNewMessagesCount = newMessageChatsCount !== null;
  const isNewMessages = isLoadedNewMessagesCount && newMessageChatsCount > 0;

  return (
    <aside className={styles.nav}>
      <Link to={ROUTES.MAIN} className={styles.link}>
        <FontAwesomeIcon
          className={classNames(
            styles.icon,
            activePath === '' && styles.active
          )}
          icon={faFireFlameCurved}
        />
      </Link>
      <Link to={ROUTES.PAIRS} className={styles.link}>
        <FontAwesomeIcon
          className={classNames(
            styles.icon,
            activePath === 'pairs' && styles.active
          )}
          icon={faStar}
        />
      </Link>
      <Link to={ROUTES.CHAT} className={styles.link}>
        {isNewMessages && (
          <div className={styles.newMessages}>
            <div className={styles.count}>
              {newMessageChatsCount > 9 ? '9+' : newMessageChatsCount}
            </div>
          </div>
        )}
        <FontAwesomeIcon
          className={classNames(
            styles.icon,
            getIsChatPage(pathname) && styles.active
          )}
          icon={faComments}
        />
      </Link>
      <Link to={ROUTES.PROFILE} className={styles.link}>
        <FontAwesomeIcon
          className={classNames(
            styles.icon,
            getIsProfilePage(pathname) && styles.active
          )}
          icon={faUser}
        />
      </Link>
    </aside>
  );
};
