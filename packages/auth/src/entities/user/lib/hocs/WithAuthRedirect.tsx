import type { ComponentType, FC } from 'react';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@ducks-tinder-client/common';
import { useAuthStore } from '@entities/user/model';
import { useRefreshMutation } from '@entities/user/api';

export const WithAuthRedirect = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  const Wrapper = (props: P) => {
    const { pathname } = useLocation();
    const { mutateAsync } = useRefreshMutation();
    const isAuth = useAuthStore((state) => state.isAuth);

    useEffect(() => {
      if (isAuth === null) {
        mutateAsync();
      }
    }, [isAuth, mutateAsync]);

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
