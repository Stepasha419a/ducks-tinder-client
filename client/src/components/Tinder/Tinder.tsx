import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { getSortedUsersThunk, updateUserThunk } from "../../redux/usersReducer"
import TinderButtons from "./TinderButtons"
import TinderFullPreview from "./TinderFullPreview"
import TinderUser from "./TinderUser"

const Tinder: React.FC = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const tinderUsers = useSelector((state: AppStateType) => state.usersPage.tinderUsers)

    const [currentTinderUsersIndex, setCurrentTinderUsersIndex] = useState<number>(0)
    const [isFullPreview, setIsFullPreview] = useState(false)

    useEffect(() => {
        if(!currentTinderUsersIndex) {
            dispatch(getSortedUsersThunk({user: currentUser, type: 'set'}) as any)
        } else if(currentTinderUsersIndex % 5 === 0) {
            dispatch(getSortedUsersThunk({user: currentUser, type: 'add'}) as any)
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