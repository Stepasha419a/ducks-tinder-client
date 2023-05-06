import type { FC, ReactElement } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks';
import { checkFields } from '@entities/setting/model';
import { createNotification } from '@entities/notification/model';

export const WithCheckedFields = <P extends object>(Component: FC<P>) => {
  const Wrapper = (props: P): ReactElement<P> => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const errorFields = useAppSelector((state) => state.setting.errorFields);
    const notifications = useAppSelector(
      (state) => state.notification.notifications
    );

    useEffect(() => {
      if (isAuth) {
        dispatch(checkFields(currentUser));
        if (errorFields.length) {
          return navigate('/profile');
        }
      }
    }, [isAuth, navigate, currentUser, dispatch, errorFields.length]);

    useEffect(() => {
      const errorText =
        'You have some empty fields, they are selected with red color';
      const result = notifications.find((item) => item.text === errorText);
      if (!result && errorFields.length) {
        dispatch(createNotification({ type: 'error', text: errorText }));
      } // eslint-disable-next-line
    }, [errorFields.length, dispatch]);

    return <Component {...props} />;
  };

  return Wrapper;
};
