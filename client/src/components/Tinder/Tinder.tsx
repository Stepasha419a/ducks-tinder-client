import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AppStateType } from "../../redux/reduxStore"
import { getSortedUserThunk, updateUserThunk } from "../../redux/usersReducer"
import TinderButtons from "./TinderButtons"
import TinderFullPreview from "./TinderFullPreview"
import TinderUser from "./TinderUser"
import TinderUserLoading from "./TinderUserLoading"

const Tinder: React.FC = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const tinderUsers = useSelector((state: AppStateType) => state.usersPage.tinderUsers)

    const [currentTinderUsersIndex, setCurrentTinderUsersIndex] = useState<number>(0)
    const [requestedUsers, setRequestedUsers] = useState<string[]>([])
    const [isFullPreview, setIsFullPreview] = useState(false)

    useEffect(() => {
        if(!requestedUsers.length) {
            dispatch(getSortedUserThunk({user: currentUser}) as any)
        } else {
            dispatch(getSortedUserThunk({user: currentUser, requestedUsers}) as any)
        }// eslint-disable-next-line
    }, [currentTinderUsersIndex])

    useEffect(() => {
        if(tinderUsers.length) {
            const ids = []
            for (const user of tinderUsers) {
                ids.push(user._id)
            }
            setRequestedUsers([...currentUser.checkedUsers, ...ids])
        }
    }, [tinderUsers, currentUser.checkedUsers])

    const resetHandler = () => {
        dispatch(updateUserThunk({currentUser, inputName: "checkedUsers", changedData: []}) as any)
    }

    if(!tinderUsers.length || (currentTinderUsersIndex > tinderUsers.length)) {
        return(
            <div className="content">
                <button onClick={() => resetHandler()} className="content__reset">reset</button>
                <Link to='/profile' className="content__no-user">
                    <div className="content__no-user-text">You don't have users currently</div>
                    <div className="content__no-user-subtext">Click to change your prefer settings to get more opportunities</div>
                </Link>
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
                    <TinderButtons currentTinderUsersIndex={currentTinderUsersIndex} setCurrentTinderUsersIndex={setCurrentTinderUsersIndex} isMinimum/>
                </>
                :
                <>
                    <TinderUser currentUser={tinderUsers[currentTinderUsersIndex]} setIsFullPreview={setIsFullPreview}/>
                    <TinderButtons currentTinderUsersIndex={currentTinderUsersIndex} setCurrentTinderUsersIndex={setCurrentTinderUsersIndex}/>
                </>
                }
            </div>
            <div className="content__instructions">

            </div>
        </div>
    )
}

export default Tinder