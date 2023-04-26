import type { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@hooks';

export const WithNoAlreadyAuthRedirect = <P extends object>(
  Component: FC<P>
): FC<P> => {
  const Wrapper = (props: P) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    return isAuth ? <Navigate to="/" /> : <Component {...props} />;
  };

  return Wrapper;
};
