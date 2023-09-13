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
import { selectNewMessageChatsCount } from '@entities/chat/model';
import styles from './Nav.mobile.module.scss';
import { getIsProfilePage } from '../lib';
import { getIsChatPage } from '@entities/chat/lib';

export const NavMobile = () => {
  const { pathname } = useLocation();
  const activePath = pathname.split('/')[1];

  const newMessageChatsCount = useAppSelector(selectNewMessageChatsCount);
  const reducedCount = newMessageChatsCount > 9 ? '9+' : newMessageChatsCount;

  return (
    <aside className={styles.nav}>
      <Link to={ROUTES.main} className={styles.link}>
        <FontAwesomeIcon
          className={classNames(
            styles.icon,
            activePath === '' && styles.active
          )}
          icon={faFireFlameCurved}
        />
      </Link>
      <Link to={ROUTES.pairs} className={styles.link}>
        <FontAwesomeIcon
          className={classNames(
            styles.icon,
            activePath === 'pairs' && styles.active
          )}
          icon={faStar}
        />
      </Link>
      <Link to={ROUTES.chat} className={styles.link}>
        {newMessageChatsCount > 0 && (
          <div className={styles.newMessages}>
            <div className={styles.count}>{reducedCount}</div>
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
      <Link to={ROUTES.profile} className={styles.link}>
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
