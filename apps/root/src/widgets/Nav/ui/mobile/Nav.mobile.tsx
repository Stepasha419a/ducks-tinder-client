import { Link, useLocation } from 'react-router-dom';
import {
  faComments,
  faFeather,
  faStar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import {
  getIsChatPage,
  ROUTES,
  useAppSelector,
} from '@ducks-tinder-client/common';

import { getIsProfilePage } from '../../lib';
import * as styles from './Nav.mobile.module.scss';

export const NavMobile = () => {
  const { pathname } = useLocation();
  const activePath = pathname.split('/')[1];

  const newMessageChatsCount = useAppSelector(
    (state) => state.chat.newMessagesCount
  );
  const pairsInfo = useAppSelector((state) => state.pair.pairsInfo);

  const isLoadedNewMessagesCount = newMessageChatsCount !== null;
  const isNewMessages = isLoadedNewMessagesCount && newMessageChatsCount > 0;

  const isLoadedPairsCount = pairsInfo !== null;
  const isPairsCount = isLoadedPairsCount && pairsInfo.count > 0;

  return (
    <aside className={styles.nav}>
      <Link to={ROUTES.MAIN} className={styles.link}>
        <FontAwesomeIcon
          className={classNames(
            styles.icon,
            activePath === '' && styles.active
          )}
          icon={faFeather}
        />
      </Link>
      <Link to={ROUTES.PAIRS} className={styles.link}>
        {isPairsCount && (
          <div className={styles.newMessages}>
            <div className={styles.count}>
              {pairsInfo.count > 9 ? '9+' : pairsInfo.count}
            </div>
          </div>
        )}
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
