import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Nav from '../Nav/Nav';
import styles from './Layout.module.scss';
import { useAppSelector } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { checkFields } from '../../redux/settings/settings.slice';

export const Layout = () => {
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
    if (
      url === '/' ||
      url === '/chat' ||
      url === '/pairs' ||
      url === '/profile'
    ) {
      return (
        <div className={styles.tinder}>
          <Nav />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      );
    } else {
      return <Outlet />;
    }
  } else {
    return null;
  }
};
