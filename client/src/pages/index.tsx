import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@components';
import { useAppDispatch } from '@hooks';
import { checkAuthThunk } from '@entities/auth/model/auth.thunks';
import { ROUTES } from '@shared/constants/routes';
import { Login } from '@pages/Login';
import { Registration } from '@pages/Registration';
import { Tinder } from '@pages/Tinder';
import { Profile } from '@pages/Profile';
import { Chat } from '@pages/Chat';
import { PairsPage } from '@pages/Pairs';
import { Policy } from '@pages/Policy';

const Routing = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.registration} element={<Registration />} />

      <Route path={ROUTES.main} element={<Layout />}>
        <Route index element={<Tinder />} />
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route path={ROUTES.chat} element={<Chat />} />
        <Route path={ROUTES.pairs} element={<PairsPage />} />
        <Route path={ROUTES.policy} element={<Policy />} />
        <Route path={ROUTES.notFound} element={<div>404 NOT FOUND</div>} />
      </Route>
    </Routes>
  );
};

export default Routing;
