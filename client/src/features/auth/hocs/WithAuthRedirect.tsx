import type { FC } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { Navigate } from 'react-router-dom';
import { checkAuthThunk } from '@entities/auth/model';

export const WithAuthRedirect = <P extends object>(Component: FC<P>): FC<P> => {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.auth.isAuth);

    useEffect(() => {
      if (isAuth === null) {
        dispatch(checkAuthThunk());
      }
    }, [dispatch, isAuth]);

    if (isAuth === false) return <Navigate to="/login" replace />;
    else if (isAuth) return <Component {...props} />;
    return null;
  };

  return Wrapper;
};
