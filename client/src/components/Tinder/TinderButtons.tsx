import { faBolt, faHeart, faRotateLeft, faStar, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FocusEvent, MouseEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { likeUserThunk, setCurrentTinderUsersIndex, setIsReturnUser, updateUserThunk } from "../../redux/usersReducer"

interface TinderButtonsProps{
    currentTinderUsersIndex: number
    isMinimum?: boolean
}

const TinderButtons: React.FC<TinderButtonsProps> = ({currentTinderUsersIndex, isMinimum = false}) => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const tinderUsers = useSelector((state: AppStateType) => state.usersPage.tinderUsers)
    const isReturnUser = useSelector((state: AppStateType) => state.usersPage.isReturnUser)
    
    const returnUser = () => {
        if(currentTinderUsersIndex && isReturnUser) {
            const newCheckedUsers = [...currentUser.checkedUsers]
            const index = currentUser.checkedUsers.findIndex(item => item === tinderUsers[currentTinderUsersIndex - 1]._id)

            newCheckedUsers.splice(index, 1)
            dispatch(updateUserThunk({currentUser, inputName: 'checkedUsers', changedData: newCheckedUsers}) as any)
            dispatch(setCurrentTinderUsersIndex(currentTinderUsersIndex - 1))
            dispatch(setIsReturnUser(false))
        }
    }

    const dislikeUser = () => {
        dispatch(updateUserThunk({currentUser, inputName: 'checkedUsers', changedData: [...currentUser.checkedUsers, tinderUsers[currentTinderUsersIndex]._id]}) as any)
        dispatch(setCurrentTinderUsersIndex(currentTinderUsersIndex + 1))
        dispatch(setIsReturnUser(true))
    }

    const likeUser = () => {
        dispatch(likeUserThunk({currentUser, tinderUser: tinderUsers[currentTinderUsersIndex]}) as any)
        dispatch(setCurrentTinderUsersIndex(currentTinderUsersIndex + 1))
    }

    const btnFocus = (e: FocusEvent<HTMLButtonElement, any>, color: string) => {
        if(currentTinderUsersIndex && isReturnUser && color === 'gold') {
            const target = e.target as Element;
            target.classList.add(`content__btn--active-gold`)
        } else if (color !== 'gold'){
            const target = e.target as Element;
            target.classList.add(`content__btn--active-${color}`)
        }
    }

    const btnMouseOut = (e: MouseEvent<HTMLButtonElement, any>, color: string) => {
        const target = e.target as HTMLElement;
        target.classList.remove(`content__btn--active-${color}`)
        target.blur()
    }

    return(
        <>
        {isMinimum ?
            <div className="content__buttons content__buttons--minimized">
                <button onClick={() => dislikeUser()} onFocus={(e) => btnFocus(e, 'red')} onMouseOut={(e) => btnMouseOut(e, 'red')} className="content__btn content__btn--large content__btn--red content__btn--minimized">
                    <div className="content__btn-icon-wrapper content__btn-icon-wrapper--large content__btn-icon-wrapper--minimized">
                        <FontAwesomeIcon icon={faXmark} className="content__btn-icon content__btn-icon--red content__btn-icon--large"/>
                    </div>
                </button>
                <button onClick={() => likeUser()} onFocus={(e) => btnFocus(e, 'blue')} onMouseOut={(e) => btnMouseOut(e, 'blue')} className="content__btn content__btn--small content__btn--blue content__btn--minimized">
                    <div className="content__btn-icon-wrapper content__btn-icon-wrapper--minimized">
                        <FontAwesomeIcon icon={faStar} className="content__btn-icon content__btn-icon--blue"/>
                    </div>
                </button>
                <button onClick={() => likeUser()} onFocus={(e) => btnFocus(e, 'green')} onMouseOut={(e) => btnMouseOut(e, 'green')} className="content__btn content__btn--large content__btn--green content__btn--minimized">
                    <div className="content__btn-icon-wrapper content__btn-icon-wrapper--large content__btn-icon-wrapper--minimized">
                        <FontAwesomeIcon icon={faHeart} className="content__btn-icon content__btn-icon--green"/>
                    </div>
                </button>
            </div>
        :
            <div className="content__buttons">
                <button onClick={() => returnUser()} onFocus={(e) => btnFocus(e, 'gold')} onMouseOut={(e) => btnMouseOut(e, 'gold')} className={`content__btn content__btn--small${(currentTinderUsersIndex && isReturnUser) ? ' content__btn--gold' : ' content__btn--blocked'}`}>
                    <div className="content__btn-icon-wrapper">
                        <FontAwesomeIcon icon={faRotateLeft} className={`content__btn-icon ${(currentTinderUsersIndex && isReturnUser) ? ' content__btn-icon--gold' : ' content__btn-icon--blocked'}`}/>
                    </div>
                </button>
                <button onClick={() => dislikeUser()} onFocus={(e) => btnFocus(e, 'red')} onMouseOut={(e) => btnMouseOut(e, 'red')} className="content__btn content__btn--large content__btn--red">
                    <div className="content__btn-icon-wrapper content__btn-icon-wrapper--large">
                        <FontAwesomeIcon icon={faXmark} className="content__btn-icon content__btn-icon--red content__btn-icon--large"/>
                    </div>
                </button>
                <button onClick={() => likeUser()} onFocus={(e) => btnFocus(e, 'blue')} onMouseOut={(e) => btnMouseOut(e, 'blue')} className="content__btn content__btn--small content__btn--blue">
                    <div className="content__btn-icon-wrapper">
                        <FontAwesomeIcon icon={faStar} className="content__btn-icon content__btn-icon--blue"/>
                    </div>
                </button>
                <button onClick={() => likeUser()} onFocus={(e) => btnFocus(e, 'green')} onMouseOut={(e) => btnMouseOut(e, 'green')} className="content__btn content__btn--large content__btn--green">
                    <div className="content__btn-icon-wrapper content__btn-icon-wrapper--large">
                        <FontAwesomeIcon icon={faHeart} className="content__btn-icon content__btn-icon--green"/>
                    </div>
                </button>
                <button onFocus={(e) => btnFocus(e, 'purple')} onMouseOut={(e) => btnMouseOut(e, 'purple')} className="content__btn content__btn--small content__btn--purple">
                    <div className="content__btn-icon-wrapper">
                        <FontAwesomeIcon icon={faBolt} className="content__btn-icon content__btn-icon--purple"/>
                    </div>
                </button>
            </div>
        }
        </>
    )
}

export default TinderButtons