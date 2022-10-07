import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import LoginForm from './components/Forms/LoginForm';
import Tinder from './components/Tinder/Tinder';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { checkAuthThunk } from './redux/authReducer';
import { AppStateType } from './redux/reduxStore';
import RegistrationForm from './components/Forms/Registration';
import Profile from './components/Profile/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import Policy from './components/Policy/Policy';
import Chat from './components/Chat/Chat';
import Pairs from './components/Pairs/Pairs';
import { potentialFields } from './models/IUser';
import { checkField } from './components/Profile/utils/ProfileUtils';

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector((state: AppStateType) => state.authPage.isLoading)
  const formError = useSelector((state: AppStateType) => state.authPage.formError)
  const isAuth = useSelector((state: AppStateType) => state.authPage.isAuth)
  const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

  const [isPairsOpened, setIsPairsOpened] = useState(true)

  const socket: MutableRefObject<WebSocket | undefined> = useRef()

  useEffect(() => {
    dispatch(checkAuthThunk() as any)
  }, [dispatch])
  
  const pathname = useLocation().pathname

  useEffect(() => {
    pathname === '/chat' ? setIsPairsOpened(false) : setIsPairsOpened(true);
  }, [pathname])

  useEffect(() => {
    if(isAuth) {
      for (const field of potentialFields) {
        const result = checkField(currentUser, field)
        if(result) {
          return navigate('profile')
        }
      }
    }
  }, [isAuth, navigate, currentUser])

  return (
    <>
      <div className={'loading-page ' + (!isLoading && 'loading-page--invisible')}>
        <FontAwesomeIcon icon={faFireFlameCurved} className="loading-page__icon"/>
      </div>
      
      <Routes>
        <Route path="/login" element={<LoginForm formError={formError}/>}/>
        <Route path="/reg" element={<RegistrationForm formError={formError}/>}/>

          <Route path="/" element={<Layout isPairsOpened={isPairsOpened} setIsPairsOpened={setIsPairsOpened} socket={socket} />}>
            <Route index element={<Tinder />}/>
            <Route path="profile" element={<Profile />}/>
            <Route path="chat" element={<Chat socket={socket}/>}/>
            <Route path="pairs" element={<Pairs />}/>
            <Route path="policy" element={<Policy />}/>
            <Route path="*" element={<div>404 NOT FOUND</div>} />
          </Route>
        
      </Routes>
    </>
  );
}

export default App;
