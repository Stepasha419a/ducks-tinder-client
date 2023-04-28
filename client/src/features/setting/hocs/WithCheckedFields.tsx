import type { FC, ReactElement } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useNavigate } from 'react-router-dom';
import { checkFields } from '@entities/setting/model';

export const WithCheckedFields = <P extends Record<string, unknown>>(
  Component: FC<P>
) => {
  const Wrapper = (props: P): ReactElement<P> => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const errorFields = useAppSelector((state) => state.setting.errorFields);

    useEffect(() => {
      if (isAuth) {
        dispatch(checkFields(currentUser));
        if (errorFields.length) {
          return navigate('/profile');
        }
      }
    }, [isAuth, navigate, currentUser, dispatch, errorFields.length]);

    return <Component {...props} />;
  };

  return Wrapper;
};
