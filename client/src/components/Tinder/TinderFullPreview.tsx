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
        <div className="content-user content-user--full">
            <div className="content-user-slider content-user-slider--full">
                <ImageSlider images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id} imageExtraClassName="content-user-slider-image content-user-slider-image--full"/>
                <button onClick={() => setIsFullPreview(false)} className="content-full-preview-close content-user-close-full">
                    <FontAwesomeIcon icon={faCircleDown} className="content-full-preview-close-icon"/>
                </button>
            </div>
            <div className="content-user-info content-info-setting">
                <div className="content-user-descr content-user-descr--full">
                    <div className="content-user-descr-person content-user-descr-person--full">
                        {currentUser.name} <span className="content-user-descr-years">{currentUser.age}</span>
                    </div>
                    <div className="content-user-descr-place content-user-descr-place--full">
                        <FontAwesomeIcon icon={faHouse} className="content-user-descr-place-icon content-user-descr-place-icon--full"/>
                        <div className="content-user-descr-place-text">
                            Lives in {currentUser.partnerSettings.place}
                        </div>
                    </div>
                    <div className="content-user-descr-distance content-user-descr-distance--full">
                        <FontAwesomeIcon icon={faLocationDot} className="content-user-descr-distance-icon"/>
                        {currentUser.partnerSettings.distance}
                        <span className="content-user-distance-text">
                            km from you
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TinderFullPreview