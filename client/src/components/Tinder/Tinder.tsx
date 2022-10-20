import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { getSortedUserThunk, updateUserThunk } from "../../redux/usersReducer"
import TinderButtons from "./TinderButtons"
import TinderFullPreview from "./TinderFullPreview"
import TinderUser from "./TinderUser"

const Tinder: React.FC = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const tinderUsers = useSelector((state: AppStateType) => state.usersPage.tinderUsers)

    const [currentTinderUsersIndex, setCurrentTinderUsersIndex] = useState<number>(0)
    const [requestedUsers, setRequestedUsers] = useState<string[]>([])
    const [isFullPreview, setIsFullPreview] = useState(false)

    console.log(currentTinderUsersIndex)

    useEffect(() => {
        if(currentTinderUsersIndex === 0) {
            dispatch(getSortedUserThunk({user: currentUser}) as any)
        } else if(currentTinderUsersIndex === requestedUsers.length) {
            console.log('req')
            dispatch(getSortedUserThunk({user: currentUser, requestedUsers}) as any)
        } // eslint-disable-next-line
    }, [currentTinderUsersIndex])

    useEffect(() => {
        if(tinderUsers.length) {
            const ids = []
            for (const user of tinderUsers) {
                ids.push(user._id)
            }
            setRequestedUsers(ids)
        }
    }, [tinderUsers])

    const resetHandler = () => {
        dispatch(updateUserThunk({currentUser, inputName: "checkedUsers", changedData: []}) as any)
    }

    if(!tinderUsers.length) {
        return(
            <div>
                loading
                <button onClick={() => resetHandler()} className="content__reset">reset</button>
            </div>
        )
    }

    if(currentTinderUsersIndex === tinderUsers.length) {
        return(
            <div>loading extra users</div>
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