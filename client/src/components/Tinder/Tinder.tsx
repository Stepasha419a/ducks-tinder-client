import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { getSortedUserThunk, setRequestedUsers, updateUserThunk } from "../../redux/usersReducer"
import TinderButtons from "./TinderButtons"
import TinderFullPreview from "./TinderFullPreview"
import TinderUser from "./TinderUser"
import TinderUserLoading from "./Loading/UserLoading"
import TinderUserFailed from "./Loading/UserFailed"

const Tinder: React.FC = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const tinderUsers = useSelector((state: AppStateType) => state.usersPage.tinderUsers)
    const currentTinderUsersIndex = useSelector((state: AppStateType) => state.usersPage.currentTinderUsersIndex)
    const requestedUsers = useSelector((state: AppStateType) => state.usersPage.requestedUsers)
    const isFailed = useSelector((state: AppStateType) => state.usersPage.isFailed)

    const [isFullPreview, setIsFullPreview] = useState(false)

    useEffect(() => {
        if(!requestedUsers.length) {
            dispatch(getSortedUserThunk({user: currentUser}) as any)
        } else if(currentTinderUsersIndex + 1 > tinderUsers.length) {
            dispatch(getSortedUserThunk({user: currentUser, requestedUsers}) as any)
        }// eslint-disable-next-line
    }, [currentTinderUsersIndex])

    useEffect(() => {
        if(tinderUsers.length) {
            const ids = []
            for (const user of tinderUsers) {
                ids.push(user._id)
            }
            dispatch(setRequestedUsers([...currentUser.checkedUsers, ...ids]))
        }
    }, [tinderUsers, currentUser.checkedUsers, dispatch])

    const resetHandler = () => {
        dispatch(updateUserThunk({currentUser, inputName: "checkedUsers", changedData: []}) as any)
    }

    if(isFailed) {
        return(
            <div className="content">
                <button onClick={() => resetHandler()} className="content__reset">reset</button>
                <TinderUserFailed />
            </div>
        )
    }

    if(currentTinderUsersIndex === tinderUsers.length) {
        return(
            <div className="content">
                <button onClick={() => resetHandler()} className="content__reset">reset</button>
                <TinderUserLoading />
            </div>
        )
    }
    

    return(
        <div className="content">
            <button onClick={() => resetHandler()} className="content__reset">reset</button>
            <div className="content__users">
                {isFullPreview ?
                <>
                    <TinderFullPreview currentUser={tinderUsers[currentTinderUsersIndex]} setIsFullPreview={setIsFullPreview}/>
                    <TinderButtons currentTinderUsersIndex={currentTinderUsersIndex} isMinimum/>
                </>
                :
                <>
                    <TinderUser currentUser={tinderUsers[currentTinderUsersIndex]} setIsFullPreview={setIsFullPreview} />
                    <TinderButtons currentTinderUsersIndex={currentTinderUsersIndex} />
                </>
                }
            </div>
            <div className="content__instructions">

            </div>
        </div>
    )
}

export default Tinder