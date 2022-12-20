import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { Chat, Profile, Tinder, LoginForm, RegistrationForm, Pairs, Policy, Layout } from '..';
import { checkAuthThunk } from '../../redux/authReducer';
import { useAppDispatch, useAppSelector } from '../../redux/reduxStore';

const Routing = () => {
  const dispatch = useAppDispatch();

  const formError = useAppSelector((state) => state.authPage.formError);

  const [isPairsOpened, setIsPairsOpened] = useState(true);

  const socket: MutableRefObject<Socket | undefined> = useRef();

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);

  const pathname = useLocation().pathname;

  useEffect(() => {
    pathname === '/chat' ? setIsPairsOpened(false) : setIsPairsOpened(true);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm formError={formError} />} />
      <Route path="/reg" element={<RegistrationForm formError={formError} />} />

      <Route
        path="/"
        element={
          <Layout
            isPairsOpened={isPairsOpened}
            setIsPairsOpened={setIsPairsOpened}
            socket={socket}
          />
        }
      >
        <Route index element={<Tinder />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chat" element={<Chat socket={socket} />} />
        <Route path="pairs" element={<Pairs />} />
        <Route path="policy" element={<Policy />} />
        <Route path="*" element={<div>404 NOT FOUND</div>} />
      </Route>
    </Routes>
  );
};

export default Routing;
