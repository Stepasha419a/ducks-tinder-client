import { faCircleDown, faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IUser } from "../../models/IUser"
import ImageSlider from "../Slider/ImageSlider"

interface TinderFullPreviewProps {
    currentUser: IUser
    setIsFullPreview: (setting: boolean) => void
}

const TinderFullPreview: React.FC<TinderFullPreviewProps> = ({currentUser, setIsFullPreview}) => {
    return(
        <div className="content__user content__user--full">
            <div className="content__user-slider content__user-slider--full">
                <ImageSlider images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id} imageExtraClassName="content__user-slider-image content__user-slider-image--full"/>
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
        </div>
    )
}

export default TinderFullPreview