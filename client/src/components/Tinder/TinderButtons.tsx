import { faBolt, faHeart, faRotateLeft, faStar, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FocusEvent, MouseEvent } from "react"

interface TinderButtonsProps{
    currentTinderUsersIndex: number
    setCurrentTinderUsersIndex: (set: number) => void
}

const TinderButtons: React.FC<TinderButtonsProps> = ({currentTinderUsersIndex, setCurrentTinderUsersIndex}) => {
    
    const dislikeUser = () => {
        setCurrentTinderUsersIndex(currentTinderUsersIndex + 1)
    }

    return(
        <div className="tinder__content-buttons">
            <button className={`tinder__content-btn tinder__content-btn--small${currentTinderUsersIndex ? ' tinder__content-btn--gold' : ' tinder__content-btn--blocked'}`}>
                <div className="tinder__content-btn-icon-wrapper">
                    <FontAwesomeIcon icon={faRotateLeft} className={`tinder__content-btn-icon ${currentTinderUsersIndex ? ' tinder__content-btn-icon--gold' : ' tinder__content-btn-icon--blocked'}`}/>
                </div>
            </button>
            <button onClick={() => dislikeUser()} className="tinder__content-btn tinder__content-btn--large tinder__content-btn--red">
                <div className="tinder__content-btn-icon-wrapper tinder__content-btn-icon-wrapper--large">
                    <FontAwesomeIcon icon={faXmark} className="tinder__content-btn-icon tinder__content-btn-icon--red tinder__content-btn-icon--large"/>
                </div>
            </button>
            <button className="tinder__content-btn tinder__content-btn--small tinder__content-btn--blue">
                <div className="tinder__content-btn-icon-wrapper">
                    <FontAwesomeIcon icon={faStar} className="tinder__content-btn-icon tinder__content-btn-icon--blue"/>
                </div>
            </button>
            <button className="tinder__content-btn tinder__content-btn--large tinder__content-btn--green">
                <div className="tinder__content-btn-icon-wrapper tinder__content-btn-icon-wrapper--large">
                    <FontAwesomeIcon icon={faHeart} className="tinder__content-btn-icon tinder__content-btn-icon--green"/>
                </div>
            </button>
            <button className="tinder__content-btn tinder__content-btn--small tinder__content-btn--purple">
                <div className="tinder__content-btn-icon-wrapper">
                    <FontAwesomeIcon icon={faBolt} className="tinder__content-btn-icon tinder__content-btn-icon--purple"/>
                </div>
            </button>
        </div>
    )
}

export default TinderButtons