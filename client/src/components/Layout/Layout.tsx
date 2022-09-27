import React, { MutableRefObject, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { AppStateType } from "../../redux/reduxStore"
import Nav from "../Nav/Nav"

interface LayoutPropsInterface{
    isPairsOpened: boolean,
    setIsPairsOpened: (setting: boolean) => void
    socket: MutableRefObject<WebSocket | undefined>
}

const Layout: React.FC<LayoutPropsInterface> = ({isPairsOpened, setIsPairsOpened, socket}) => {
    const navigate = useNavigate()
    const url = useLocation().pathname
    
    const isAuth = useSelector((state: AppStateType) => state.authPage.isAuth)

    useEffect(() => {
        if(isAuth === false) {
            navigate('/login')
        }
    }, [isAuth, navigate])

    if(isAuth) {
        if(url === '/' || url === '/chat' || url === '/pairs') {
            return(
                <div className="tinder">
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