import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import LoginForm from './components/Forms/LoginForm';
import Tinder from './components/Tinder/Tinder';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { useEffect } from 'react';
import { checkAuthThunk } from './redux/authReducer';
import { AppStateType } from './redux/reduxStore';
import RegistrationForm from './components/Forms/Registration';
import Profile from './components/Profile/Profile';

function App() {

  const dispatch = useDispatch()

  const formError = useSelector((state: AppStateType) => state.authPage.formError)
  
  useEffect(() => {
    dispatch(checkAuthThunk() as any)
  }, [dispatch])

  /* useEffect(() => {
    if(isAuth && (!user.picture || !user.description)) {
      navigate('profile')
    }
  }, [isAuth, navigate, user.picture, user.description]) */

  return (
    <Routes>
      <Route path="/login" element={<LoginForm formError={formError}/>}/>
      <Route path="/reg" element={<RegistrationForm formError={formError}/>}/>
      <Route path="/" element={<Layout />}>
        <Route index element={<Tinder />}/>
        <Route path="profile" element={<Profile />}/>
        <Route path="*" element={<div>404 NOT FOUND</div>} />
      </Route>
    </Routes>
  );
}

export default App;
