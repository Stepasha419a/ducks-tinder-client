import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, Outlet } from "react-router-dom"
import { AppStateType } from "../../redux/reduxStore"

const Layout = () => {
    const navigate = useNavigate()
    
    const isAuth = useSelector((state: AppStateType) => state.authPage.isAuth)

    useEffect(() => {
        if(!isAuth) {
            navigate('/login')
        }
    }, [isAuth, navigate])
    
    return (isAuth ? <Outlet /> : null)
}

export default Layout