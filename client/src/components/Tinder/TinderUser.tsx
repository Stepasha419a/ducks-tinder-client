import { IUser } from "../../models/IUser"
import ImageSlider from "../Slider/ImageSlider"

interface TinderUserProps{
    currentUser: IUser
    setIsFullPreview: (setting: boolean) => void
}

const TinderUser: React.FC<TinderUserProps> = ({currentUser, setIsFullPreview}) => {
    return(
        <div className="tinder__content-user">
            <div className="tinder__content-user-slider">
                <ImageSlider images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id} imageExtraClassName="tinder__content-user-slider-image"/>
            </div>
            <div onClick={() => setIsFullPreview(true)} className="tinder__content-user-descr">
                <div className="tinder__content-user-descr-person">
                    {currentUser.name} <span className="tinder__content-user-descr-years">{currentUser.age}</span>
                </div>
                <div className="tinder__content-user-descr-distance">
                    {currentUser.partnerSettings.distance}
                    <span className="tinder__content-user-distance-text">
                        km from you
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TinderUser