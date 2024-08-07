import type { ComponentType, ReactElement } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkFields } from '@entities/user/';
import { useAppDispatch, useAppSelector } from '@shared/lib';
import { checkUserFields } from '../helpers';

export const WithCheckedFields = <P extends object>(
  Component: ComponentType<P>
) => {
  const Wrapper = (props: P): ReactElement<P> => {
    const { pathname } = useLocation();

    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const errorFields = useAppSelector((state) => state.user.errorFields);

    useEffect(() => {
      if (isAuth && currentUser) {
        dispatch(checkFields(checkUserFields(currentUser)));
      }
    }, [isAuth, currentUser, dispatch, errorFields.length]);

    useEffect(() => {
      if (errorFields.length) {
        toast(
          'You have some empty fields, they are selected with red color in your profile settings',
          {
            toastId: 'toast-checked-fields',
          }
        );
      }
    }, [errorFields.length, pathname]);

    return <Component {...props} />;
  };

  return Wrapper;
};
