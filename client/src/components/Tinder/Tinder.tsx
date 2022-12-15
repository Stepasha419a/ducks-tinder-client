import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { getSortedUserThunk, setRequestedUsers, updateUserThunk } from "../../redux/usersReducer"
import Buttons from "./Buttons/Buttons"
import FullPreview from "./UserPreview/FullPreview/FullPreview"
import Preview from "./UserPreview/Preview/Preview"
import TinderUserLoading from "./UserLoading/Loading/Loading"
import TinderUserFailed from "./UserLoading/Failed/Failed"
import styles from './Tinder.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowTurnDown, faDownLong, faLeftLong, faRightLong, faUpLong } from "@fortawesome/free-solid-svg-icons"

const Tinder: React.FC = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const tinderUsers = useSelector((state: AppStateType) => state.usersPage.tinderUsers)
    const currentTinderUsersIndex = useSelector((state: AppStateType) => state.usersPage.currentTinderUsersIndex)
    const requestedUsers = useSelector((state: AppStateType) => state.usersPage.requestedUsers)
    const isFailed = useSelector((state: AppStateType) => state.usersPage.isFailed)

    const [isFullPreview, setIsFullPreview] = useState(false)
    const [isInstructionsOpen, setisInstructionsOpen] = useState(true)

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
            <div className={styles.content}>
                <div className={styles.wrapper}>
                    <button onClick={() => resetHandler()} className={styles.reset}>reset</button>
                    <TinderUserFailed />
                </div>
            </div>
        )
    }

    if(currentTinderUsersIndex === tinderUsers.length) {
        return(
            <div className={styles.content}>
                <div className={styles.wrapper}>
                    <button onClick={() => resetHandler()} className={styles.reset}>reset</button>
                    <TinderUserLoading />
                </div>
            </div>
        )
    }
    

    return(
        <div className={styles.content}>
            <div className={styles.wrapper}>
                <button onClick={() => resetHandler()} className={styles.reset}>reset</button>
                <div className={styles.users}>
                    {isFullPreview ?
                    <>
                        <FullPreview currentUser={tinderUsers[currentTinderUsersIndex]} setIsFullPreview={setIsFullPreview}/>
                        <Buttons currentTinderUsersIndex={currentTinderUsersIndex} isMinimum/>
                    </>
                    :
                    <>
                        <Preview currentUser={tinderUsers[currentTinderUsersIndex]} setIsFullPreview={setIsFullPreview} />
                        <Buttons currentTinderUsersIndex={currentTinderUsersIndex} />
                    </>
                    }
                </div>
            </div>
            {isInstructionsOpen ? 
                <div className={styles.instructions}>
                    <button onClick={() => setisInstructionsOpen(false)} className={styles.toggle}>
                        hide
                    </button>
                    <div className={styles.instruction}>
                        <FontAwesomeIcon icon={faLeftLong} className={styles.icon}/>
                        <div className={styles.text}>
                            no
                        </div>
                    </div>
                    <div className={styles.instruction}>
                        <FontAwesomeIcon icon={faRightLong} className={styles.icon}/>
                        <div className={styles.text}>
                            like
                        </div>
                    </div>
                    <div className={styles.instruction}>
                        <FontAwesomeIcon icon={faUpLong} className={styles.icon}/>
                        <div className={styles.text}>
                            open profile
                        </div>
                    </div>
                    <div className={styles.instruction}>
                        <FontAwesomeIcon icon={faDownLong} className={styles.icon}/>
                        <div className={styles.text}>
                            close profile
                        </div>
                    </div>
                    <div className={styles.instruction}>
                        <FontAwesomeIcon icon={faArrowTurnDown} className={`${styles.icon} ${styles.icon_rotate}`}/>
                        <div className={styles.text}>
                            superlike
                        </div>
                    </div>
                    <div className={styles.instruction}>
                        <div className={`${styles.icon} ${styles.icon_space}`}></div>
                        <div className={styles.text}>
                            next
                        </div>
                    </div>
                </div>
            :
                <div className={styles.instructions}>
                    <button onClick={() => setisInstructionsOpen(true)} className={styles.toggle}>
                        show
                    </button>
                </div>
            }
        </div>
    )
}

export default Tinder