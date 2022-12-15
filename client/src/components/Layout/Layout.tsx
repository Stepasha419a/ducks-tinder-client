import React, { MutableRefObject, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { AppStateType } from "../../redux/reduxStore"
import Nav from "../Nav/Nav"
import { Socket } from 'socket.io-client'
import styles from './Layout.module.scss'
import { potentialFields } from '../../models/IUser';
import { checkField } from '../../components/Profile/utils/ProfileUtils';

interface LayoutPropsInterface{
    isPairsOpened: boolean,
    setIsPairsOpened: (setting: boolean) => void
    socket: MutableRefObject<Socket | undefined>
}

const Layout: React.FC<LayoutPropsInterface> = ({isPairsOpened, setIsPairsOpened, socket}) => {
    const navigate = useNavigate()
    const url = useLocation().pathname
    
    const isAuth = useSelector((state: AppStateType) => state.authPage.isAuth)
    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

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

    useEffect(() => {
        if(isAuth === false) {
            navigate('/login')
        }
    }, [isAuth, navigate])

    if(isAuth) {
        if(url === '/' || url === '/chat' || url === '/pairs') {
            return(
                <div className={styles.tinder}>
                    <Nav isPairsOpened={isPairsOpened} setIsPairsOpened={setIsPairsOpened} socket={socket}/>
                    <Outlet />
                </div>
            )
        } else {
            return(
                <Outlet />
            )
        }
    } else {
        return null
    }
}

export default Layout