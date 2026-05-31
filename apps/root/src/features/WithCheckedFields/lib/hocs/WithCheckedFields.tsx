import type { ComponentType, ReactElement } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  checkFields,
  useAppDispatch,
  useAppSelector,
} from '@ducks-tinder-client/common';

import { checkUserFields } from '../helpers';
import { useTranslation } from 'react-i18next';
import { useAuthStore, useUserStore } from '@ducks-tinder-client/auth';

export const WithCheckedFields = <P extends object>(
  Component: ComponentType<P>
) => {
  const Wrapper = (props: P): ReactElement<P> => {
    const { t } = useTranslation();

    const { pathname } = useLocation();

    const dispatch = useAppDispatch();

    const isAuth = useAuthStore((state) => state.isAuth);
    const currentUser = useUserStore((state) => state.currentUser);
    const errorFields = useAppSelector((state) => state.user.errorFields);

    useEffect(() => {
      if (isAuth && currentUser) {
        dispatch(checkFields(checkUserFields(currentUser)));
      }
    }, [isAuth, currentUser, dispatch, errorFields.length]);

    useEffect(() => {
      if (errorFields.length) {
        toast(t('profile.emptyFields'), {
          toastId: 'toast-checked-fields',
        });
      }
    }, [errorFields.length, pathname, t]);

    return <Component {...props} />;
  };

  return Wrapper;
};
