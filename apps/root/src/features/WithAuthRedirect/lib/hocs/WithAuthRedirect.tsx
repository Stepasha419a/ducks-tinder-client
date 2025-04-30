import type { ComponentType, FC } from 'react';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { checkAuthThunk, ROUTES } from '@ducks-tinder-client/common';

import { useAppDispatch, useAppSelector } from '@shared/lib';

export const WithAuthRedirect = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  const Wrapper = (props: P) => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.auth.isAuth);

    useEffect(() => {
      if (isAuth === null) {
        dispatch(checkAuthThunk());
      }
    }, [dispatch, isAuth]);

    // already auth => no permission for login/reg pages
    if (pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTRATION) {
      return isAuth ? <Navigate to="/" /> : <Component {...props} />;
    }

    // not auth => login redirect (reg is available)
    if (isAuth === false) return <Navigate to="/login" replace />;
    else if (isAuth) return <Component {...props} />;

    // if auth === null (it shows start screen and awaits for refresh)
    return null;
  };

  return Wrapper;
};
