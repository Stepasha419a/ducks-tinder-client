import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import LoginForm from './components/Forms/LoginForm';
import Tinder from './components/Tinder/Tinder';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { useEffect, useState } from 'react';
import { checkAuthThunk } from './redux/authReducer';
import { AppStateType } from './redux/reduxStore';
import RegistrationForm from './components/Forms/Registration';
import Profile from './components/Profile/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import Policy from './components/Policy/Policy';
import Chat from './components/Chat/Chat';

function App() {

  const dispatch = useDispatch()

  const isLoading = useSelector((state: AppStateType) => state.authPage.isLoading)
  const formError = useSelector((state: AppStateType) => state.authPage.formError)
  const [isPairsOpened, setIsPairsOpened] = useState(true)

  useEffect(() => {
    dispatch(checkAuthThunk() as any)
  }, [dispatch])
  
  const pathname = useLocation().pathname

  useEffect(() => {
    pathname === '/chat' ? setIsPairsOpened(false) : setIsPairsOpened(true);
  }, [pathname])

  /* useEffect(() => {
    if(isAuth && (!user.picture || !user.description)) {
      navigate('profile')
    }
  }, [isAuth, navigate, user.picture, user.description]) */

  return (
    <>
      <div className={'loading-page ' + (!isLoading && 'loading-page--invisible')}>
        <FontAwesomeIcon icon={faFireFlameCurved} className="loading-page__icon"/>
      </div>
      
      <Routes>
        <Route path="/login" element={<LoginForm formError={formError}/>}/>
        <Route path="/reg" element={<RegistrationForm formError={formError}/>}/>

          <Route path="/" element={<Layout />}>
            <Route index element={<Tinder isPairsOpened={isPairsOpened} setIsPairsOpened={setIsPairsOpened}/>}/>
            <Route path="profile" element={<Profile />}/>
            <Route path="chat" element={<Chat isPairsOpened={isPairsOpened} setIsPairsOpened={setIsPairsOpened}/>}/>
            <Route path="policy" element={<Policy />}/>
            <Route path="*" element={<div>404 NOT FOUND</div>} />
          </Route>
        
      </Routes>
    </>
  );
}

export default App;
