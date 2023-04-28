import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkFields } from '@entities/setting/model';
import { useAppSelector } from '@hooks';

// TODO: create withAuth HOC and withCheckedFields HOC instead of it
export const Layout = (): ReactElement | null => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  useEffect(() => {
    if (isAuth) {
      dispatch(checkFields(currentUser));
      if (errorFields.length) {
        return navigate('profile');
      }
    }
  }, [isAuth, navigate, currentUser, dispatch, errorFields.length]);

  return <Outlet />;
};
