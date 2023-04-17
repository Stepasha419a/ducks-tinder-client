import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Nav } from '@widgets';
import { checkFields } from '@entities/setting/model';
import { useAppSelector } from '@hooks';
import styles from './Layout.module.scss';

export const Layout = (): ReactElement | null => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

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
    if (
      pathname === '/' ||
      pathname === '/chat' ||
      pathname === '/pairs' ||
      pathname === '/profile'
    ) {
      return (
        <div className={styles.tinder}>
          <Nav />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      );
    }
    return <Outlet />;
  }
  return null;
};
