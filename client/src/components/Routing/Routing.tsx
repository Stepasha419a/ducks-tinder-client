import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Chat,
  Profile,
  Tinder,
  LoginForm,
  RegistrationForm,
  Pairs,
  Policy,
  Layout,
} from '..';
import { checkAuthThunk } from '../../redux/auth/auth.thunks';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const Routing = () => {
  const dispatch = useAppDispatch();

  const formError = useAppSelector((state) => state.authPage.formError);

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm formError={formError} />} />
      <Route path="/reg" element={<RegistrationForm formError={formError} />} />

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
