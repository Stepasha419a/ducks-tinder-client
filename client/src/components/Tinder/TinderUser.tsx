import { faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IUser } from "../../models/IUser"
import ImageSlider from "../Slider/ImageSlider"

interface TinderUserProps{
    currentUser: IUser
    setIsFullPreview: (setting: boolean) => void
}

const TinderUser: React.FC<TinderUserProps> = ({currentUser, setIsFullPreview}) => {
    return(
        <div className="content-user">
            <div className="content-user-slider">
                <ImageSlider images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id} imageExtraClassName="content-user-slider-image"/>
            </div>
            <div onClick={() => setIsFullPreview(true)} className="content-user-descr">
                <div className="content-user-descr-person">
                    {currentUser.name} <span className="content-user-descr-years">{currentUser.age}</span>
                </div>
                <div className="content-user-descr-place">
                    <FontAwesomeIcon icon={faHouse} className="content-user-descr-place-icon"/>
                    <div className="content-user-descr-place-text">
                        Lives in {currentUser.partnerSettings.place}
                    </div>
                </div>
                <div className="content-user-descr-distance">
                    <FontAwesomeIcon icon={faLocationDot} className="content-user-descr-distance-icon"/>
                    {currentUser.partnerSettings.distance}
                    <span className="content-user-distance-text">
                        km from you
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TinderUser