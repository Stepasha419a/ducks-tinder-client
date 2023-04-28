import type { FC } from 'react';
import { useAppSelector } from '@hooks';
import { Navigate } from 'react-router-dom';

export const WithAuthRedirect = <P extends object>(Component: FC<P>): FC<P> => {
  const Wrapper = (props: P) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    if (isAuth === false) return <Navigate to="/login" replace />;
    else if (isAuth) return <Component {...props} />;
    return null;
  };

  return Wrapper;
};
