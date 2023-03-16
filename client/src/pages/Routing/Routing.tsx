import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Profile,
  Tinder,
  Layout,
  LoginForm,
  RegistrationForm,
} from '../../components';
import { useAppDispatch } from '../../hooks';
import { checkAuthThunk } from '../../redux/auth/auth.thunks';
import { Chat } from '../Chat/Chat';
import { PairsPage } from '../Pairs';
import { Policy } from '../Policy';

const Routing = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/reg" element={<RegistrationForm />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Tinder />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chat" element={<Chat />} />
        <Route path="pairs" element={<PairsPage />} />
        <Route path="policy" element={<Policy />} />
        <Route path="*" element={<div>404 NOT FOUND</div>} />
      </Route>
    </Routes>
  );
};

export default Routing;
