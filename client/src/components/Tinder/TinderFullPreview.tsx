import { faCircleDown, faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { IUser } from "../../models/IUser"
import InterestsListPopup from "../Pairs/popups/InterestsListPopup"
import ImageSlider from "../Slider/ImageSlider/ImageSlider"

interface TinderFullPreviewProps {
    currentUser: IUser
    setIsFullPreview: (setting: boolean) => void
}

const TinderFullPreview: React.FC<TinderFullPreviewProps> = ({currentUser, setIsFullPreview}) => {
    const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] = useState(false)

    const interestsForLoop = []

    for (let i = 0; i < 4; i++) {
        currentUser.interests[i] && interestsForLoop.push(currentUser.interests[i]);
    }

    return(
        <div className="content__user content__user--full">
            <div className="content__user-slider content__user-slider--full">
                <ImageSlider images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id} imageExtraClassName="_tinderFull"/>
                <button onClick={() => setIsFullPreview(false)} className="content__full-preview-close content__user-close-full">
                    <FontAwesomeIcon icon={faCircleDown} className="content__full-preview-close-icon"/>
                </button>
            </div>
            <div className="content__user-info content__info-setting">
                <div className="content__user-descr content__user-descr--full">
                    <div className="content__user-descr-person content__user-descr-person--full">
                        {currentUser.name} <span className="content__user-descr-years">{currentUser.age}</span>
                    </div>
                    <div className="content__user-descr-place content__user-descr-place--full">
                        <FontAwesomeIcon icon={faHouse} className="content__user-descr-place-icon content__user-descr-place-icon--full"/>
                        <div className="content__user-descr-place-text">
                            Lives in {currentUser.partnerSettings.place}
                        </div>
                    </div>
                    <div className="content__user-descr-distance content__user-descr-distance--full">
                        <FontAwesomeIcon icon={faLocationDot} className="content__user-descr-distance-icon"/>
                        {currentUser.partnerSettings.distance}
                        <span className="content__user-distance-text">
                            km from you
                        </span>
                    </div>
                </div>
            </div>
            <hr className="content__popup-info-separator"/>
            <div className="content__popup-description">
                {currentUser.description}
            </div>
            <hr className="content__popup-info-separator"/>
            <div className="content__popup-interests">
                <div className="content__popup-interests-title">
                    Interests
                </div>
                <div className="content__popup-interests-items">
                    {interestsForLoop.map(item => {
                    return(
                        <div key={item} className='content__popup-interest'>
                            {item}
                        </div>
                    )
                    })}
                </div>
            </div>
            <div onClick={() => setIsInterestsListPopupOpen(true)} className="content__popup-setting-show-all content__popup-show-all">Show all</div>

            {isInterestsListPopupOpen && <InterestsListPopup interestsList={currentUser.interests} setIsInterestsListPopupOpen={setIsInterestsListPopupOpen} />}
        </div>
    )
}

export default TinderFullPreview