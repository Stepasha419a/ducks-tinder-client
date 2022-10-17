import { faBolt, faHeart, faRotateLeft, faStar, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FocusEvent, MouseEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { updateUserThunk } from "../../redux/usersReducer"

interface TinderButtonsProps{
    currentTinderUsersIndex: number
    setCurrentTinderUsersIndex: (set: number) => void
    isMinimum?: boolean
}

const TinderButtons: React.FC<TinderButtonsProps> = ({currentTinderUsersIndex, setCurrentTinderUsersIndex, isMinimum = false}) => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const tinderUsers = useSelector((state: AppStateType) => state.usersPage.tinderUsers)

    const [isReturn, setIsReturn] = useState(false)
    
    const returnUser = () => {
        if(currentTinderUsersIndex && isReturn) {
            const newCheckedUsers = [...currentUser.checkedUsers]
            const index = currentUser.checkedUsers.findIndex(item => item === tinderUsers[currentTinderUsersIndex - 1]._id)

            newCheckedUsers.splice(index, 1)
            dispatch(updateUserThunk({currentUser, inputName: 'checkedUsers', changedData: newCheckedUsers}) as any)
            setCurrentTinderUsersIndex(currentTinderUsersIndex - 1)
            setIsReturn(false)
        }
    }

    const dislikeUser = () => {
        dispatch(updateUserThunk({currentUser, inputName: 'checkedUsers', changedData: [...currentUser.checkedUsers, tinderUsers[currentTinderUsersIndex]._id]}) as any)
        setCurrentTinderUsersIndex(currentTinderUsersIndex + 1)
        setIsReturn(true)
    }

    const likeUser = () => {
        dispatch(updateUserThunk({currentUser, inputName: 'pairs', changedData: [...currentUser.pairs, tinderUsers[currentTinderUsersIndex]._id]}) as any)
        dispatch(updateUserThunk({currentUser, inputName: 'checkedUsers', changedData: [...currentUser.checkedUsers, tinderUsers[currentTinderUsersIndex]._id]}) as any)
        setCurrentTinderUsersIndex(currentTinderUsersIndex + 1)
    }

    const btnFocus = (e: FocusEvent<HTMLButtonElement, any>, color: string) => {
        if(currentTinderUsersIndex && isReturn && color === 'gold') {
            const target = e.target as Element;
            target.classList.add(`content-btn--active-${color}`)
        } else if (color !== 'gold'){
            const target = e.target as Element;
            target.classList.add(`content-btn--active-${color}`)
        }
    }

    const btnMouseOut = (e: MouseEvent<HTMLButtonElement, any>, color: string) => {
        const target = e.target as HTMLElement;
        target.classList.remove(`content-btn--active-${color}`)
        target.blur()
    }

    return(
        <>
        {isMinimum ?
            <div className="content-buttons content-buttons--minimized">
                <button onClick={() => dislikeUser()} onFocus={(e) => btnFocus(e, 'red')} onMouseOut={(e) => btnMouseOut(e, 'red')} className="content-btn content-btn--large content-btn--red content-btn--minimized">
                    <div className="content-btn-icon-wrapper content-btn-icon-wrapper--large content-btn-icon-wrapper--minimized">
                        <FontAwesomeIcon icon={faXmark} className="content-btn-icon content-btn-icon--red content-btn-icon--large"/>
                    </div>
                </button>
                <button onClick={() => likeUser()} onFocus={(e) => btnFocus(e, 'blue')} onMouseOut={(e) => btnMouseOut(e, 'blue')} className="content-btn content-btn--small content-btn--blue content-btn--minimized">
                    <div className="content-btn-icon-wrapper content-btn-icon-wrapper--minimized">
                        <FontAwesomeIcon icon={faStar} className="content-btn-icon content-btn-icon--blue"/>
                    </div>
                </button>
                <button onClick={() => likeUser()} onFocus={(e) => btnFocus(e, 'green')} onMouseOut={(e) => btnMouseOut(e, 'green')} className="content-btn content-btn--large content-btn--green content-btn--minimized">
                    <div className="content-btn-icon-wrapper content-btn-icon-wrapper--large content-btn-icon-wrapper--minimized">
                        <FontAwesomeIcon icon={faHeart} className="content-btn-icon content-btn-icon--green"/>
                    </div>
                </button>
            </div>
        :
            <div className="content-buttons">
                <button onClick={() => returnUser()} onFocus={(e) => btnFocus(e, 'gold')} onMouseOut={(e) => btnMouseOut(e, 'gold')} className={`content-btn content-btn--small${(currentTinderUsersIndex && isReturn) ? ' content-btn--gold' : ' content-btn--blocked'}`}>
                    <div className="content-btn-icon-wrapper">
                        <FontAwesomeIcon icon={faRotateLeft} className={`content-btn-icon ${(currentTinderUsersIndex && isReturn) ? ' content-btn-icon--gold' : ' content-btn-icon--blocked'}`}/>
                    </div>
                </button>
                <button onClick={() => dislikeUser()} onFocus={(e) => btnFocus(e, 'red')} onMouseOut={(e) => btnMouseOut(e, 'red')} className="content-btn content-btn--large content-btn--red">
                    <div className="content-btn-icon-wrapper content-btn-icon-wrapper--large">
                        <FontAwesomeIcon icon={faXmark} className="content-btn-icon content-btn-icon--red content-btn-icon--large"/>
                    </div>
                </button>
                <button onClick={() => likeUser()} onFocus={(e) => btnFocus(e, 'blue')} onMouseOut={(e) => btnMouseOut(e, 'blue')} className="content-btn content-btn--small content-btn--blue">
                    <div className="content-btn-icon-wrapper">
                        <FontAwesomeIcon icon={faStar} className="content-btn-icon content-btn-icon--blue"/>
                    </div>
                </button>
                <button onClick={() => likeUser()} onFocus={(e) => btnFocus(e, 'green')} onMouseOut={(e) => btnMouseOut(e, 'green')} className="content-btn content-btn--large content-btn--green">
                    <div className="content-btn-icon-wrapper content-btn-icon-wrapper--large">
                        <FontAwesomeIcon icon={faHeart} className="content-btn-icon content-btn-icon--green"/>
                    </div>
                </button>
                <button onFocus={(e) => btnFocus(e, 'purple')} onMouseOut={(e) => btnMouseOut(e, 'purple')} className="content-btn content-btn--small content-btn--purple">
                    <div className="content-btn-icon-wrapper">
                        <FontAwesomeIcon icon={faBolt} className="content-btn-icon content-btn-icon--purple"/>
                    </div>
                </button>
            </div>
        }
        </>
    )
}

export default TinderButtons