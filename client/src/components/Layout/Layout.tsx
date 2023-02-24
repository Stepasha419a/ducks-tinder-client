import React, { MutableRefObject, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { Socket } from 'socket.io-client';
import styles from './Layout.module.scss';
import { useAppSelector } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { checkFields } from '../../redux/settings/settings.slice';

interface LayoutPropsInterface {
  isPairsOpened: boolean;
  setIsPairsOpened: (setting: boolean) => void;
  socket: MutableRefObject<Socket | undefined>;
}

export const Layout: React.FC<LayoutPropsInterface> = ({
  isPairsOpened,
  setIsPairsOpened,
  socket,
}) => {
  const navigate = useNavigate();
  const url = useLocation().pathname;

  const dispatch = useDispatch();

  const isAuth = useAppSelector((state) => state.authPage.isAuth);
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const errorFields = useAppSelector((state) => state.settings.errorFields);

  useEffect(() => {
    if (isAuth) {
      dispatch(checkFields(currentUser));
      if (errorFields.length) {
        return navigate('profile');
      }
    }
  }, [isAuth, navigate, currentUser, dispatch, errorFields.length]);

  useEffect(() => {
    if (isAuth === false) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  if (isAuth) {
    if (url === '/' || url === '/chat' || url === '/pairs') {
      return (
        <div className={styles.tinder}>
          <Nav
            isPairsOpened={isPairsOpened}
            setIsPairsOpened={setIsPairsOpened}
            socket={socket}
          />
          <Outlet />
        </div>
      );
    } else {
      return <Outlet />;
    }
  } else {
    return null;
  }
};
