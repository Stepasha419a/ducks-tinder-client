import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Chat,
  Profile,
  Tinder,
  Pairs,
  Policy,
  Layout,
  LoginForm,
  RegistrationForm,
} from '..';
import { useAppDispatch } from '../../hooks';
import { checkAuthThunk } from '../../redux/auth/auth.thunks';

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
        <Route path="pairs" element={<Pairs />} />
        <Route path="policy" element={<Policy />} />
        <Route path="*" element={<div>404 NOT FOUND</div>} />
      </Route>
    </Routes>
  );
};

export default Routing;
