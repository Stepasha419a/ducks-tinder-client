import {
  faBriefcase,
  faHeart,
  faHeartCircleExclamation,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppStateType } from '../../redux/reduxStore';
import Chats from '../Chat/Chats/Chats';
import { Avatar } from '../';
import { MutableRefObject, useEffect, useState } from 'react';
import { IUser } from '../../models/IUser';
import { getUserThunk } from '../../redux/usersReducer';
import defaultPhoto from '../../assets/images/photos/1.jpg';
import { Socket } from 'socket.io-client';
import styles from './Nav.module.scss';

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
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: AppStateType) => state.usersPage.currentUser
  );
  const [firstPair, setFirstPair] = useState<IUser>({} as IUser);

  useEffect(() => {
    if (currentUser.pairs.length) {
      const fetchUser = async (userId: string) => {
        const data = await dispatch(getUserThunk({ id: userId }) as any);
        return data.payload;
      };

      fetchUser(currentUser.pairs[0]).then((data) => setFirstPair(data));
    }
  }, [currentUser.pairs, dispatch]);

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
          {isPairsOpened ? (
            currentUser.pairs.length ? (
              firstPair.name ? (
                <div className={styles.pairs}>
                  <Link className={styles.link} to="/pairs">
                    <div
                      style={{
                        backgroundImage: `url(${
                          firstPair.pictures.avatar
                            ? `http://localhost:5000/${firstPair._id}/avatar/` +
                              firstPair.pictures.avatar
                            : defaultPhoto
                        })`,
                      }}
                      className={styles.content}
                    >
                      <div className={styles.likes}>
                        {currentUser.pairs.length}
                      </div>
                      <div className={styles.text}>
                        {currentUser.pairs.length} likes
                      </div>
                      <FontAwesomeIcon
                        icon={faHeartCircleExclamation}
                        className={styles.icon}
                      />
                    </div>
                  </Link>
                </div>
              ) : (
                <div>loading...</div>
              )
            ) : (
              <div className={styles.noPairs}>
                <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                <div>You don't have likes. Like someone to have a like too</div>
              </div>
            )
          ) : (
            <Chats socket={socket} />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Nav;
