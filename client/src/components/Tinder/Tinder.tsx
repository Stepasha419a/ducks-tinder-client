import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { getSortedUsersThunk, updateUserThunk } from "../../redux/usersReducer"
import TinderButtons from "./TinderButtons"
import TinderUser from "./TinderUser"

const Tinder: React.FC = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const tinderUsers = useSelector((state: AppStateType) => state.usersPage.tinderUsers)

    const [currentTinderUsersIndex, setCurrentTinderUsersIndex] = useState<number>(0)

    useEffect(() => {
        if(!currentTinderUsersIndex || currentTinderUsersIndex % 5 === 0) {
            dispatch(getSortedUsersThunk({user: currentUser}) as any)
        }
    }, [currentUser, dispatch, currentTinderUsersIndex])

    if(!tinderUsers.length) {
        return(
            <div>loading</div>
        )
    }

    if(currentTinderUsersIndex === tinderUsers.length) {
        return(
            <div>loading extra users</div>
        )
    }

    const resetHandler = () => {
        dispatch(updateUserThunk({currentUser, inputName: "checkedUsers", changedData: []}) as any)
    }

    return(
        <div className="tinder__content">
            <button onClick={() => resetHandler()} className="tinder__content-reset">reset</button>
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