import type { FC, ReactElement } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toastify } from '@shared/lib';
import { useAppDispatch, useAppSelector, useDebouncedCallback } from '@hooks';
import { checkFields } from '@entities/setting/model';

export const WithCheckedFields = <P extends object>(Component: FC<P>) => {
  const Wrapper = (props: P): ReactElement<P> => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const errorFields = useAppSelector((state) => state.setting.errorFields);

    useEffect(() => {
      if (isAuth) {
        dispatch(checkFields(currentUser));
        if (
          errorFields.length &&
          !pathname.match(/\/profile\/([a-z]+)-?([a-z]*)/)?.[1]
        ) {
          return navigate('/profile');
        }
      }
    }, [isAuth, navigate, currentUser, dispatch, errorFields.length, pathname]);

    // checkFields call toastify twice => it displays it only once in rerender
    const debouncedToastify = useDebouncedCallback(
      () =>
        toastify(
          'You have some empty fields, they are selected with red color'
        ),
      50
    );

    useEffect(() => {
      if (errorFields.length) {
        debouncedToastify();
      } // eslint-disable-next-line
    }, [errorFields.length]);

    return <Component {...props} />;
  };

  return Wrapper;
};
