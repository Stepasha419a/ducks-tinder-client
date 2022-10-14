import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { getSortedUsersThunk } from "../../redux/usersReducer"
import TinderButtons from "./TinderButtons"
import TinderUser from "./TinderUser"

const Tinder: React.FC = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const tinderUsers = useSelector((state: AppStateType) => state.usersPage.tinderUsers)

    const [currentTinderUsersIndex, setCurrentTinderUsersIndex] = useState<number>(0)

    useEffect(() => {
        dispatch(getSortedUsersThunk({user: currentUser}) as any)
    }, [currentUser, dispatch])

    if(!tinderUsers.length) {
        return(
            <div>loading</div>
        )
    }

    return(
        <div className="tinder__content">
            <div className="tinder__content-users">
                <TinderUser currentUser={tinderUsers[currentTinderUsersIndex]}/>
                <TinderButtons currentTinderUsersIndex={currentTinderUsersIndex} setCurrentTinderUsersIndex={setCurrentTinderUsersIndex}/>
            </div>
            <div className="tinder__content-instructions">

            </div>
        </div>
    )
}

export default Tinder