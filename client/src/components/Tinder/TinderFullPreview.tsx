import { IUser } from "../../models/IUser"
import ImageSlider from "../Slider/ImageSlider"

interface TinderFullPreviewProps {
    currentUser: IUser
    setIsFullPreview: (setting: boolean) => void
}

const TinderFullPreview: React.FC<TinderFullPreviewProps> = ({currentUser, setIsFullPreview}) => {
    return(
        <div className="tinder__content-user">
            <div className="tinder__content-user-slider">
                <ImageSlider images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id} imageExtraClassName="tinder__content-user-slider-image tinder__content-user-slider-image--full"/>
            </div>
            <div className="tinder__content-user-info">
                <div className="tinder__content-user-descr">
                    <div className="tinder__content-user-descr-person tinder__content-user-descr-person--full">
                        {currentUser.name} <span className="tinder__content-user-descr-years">{currentUser.age}</span>
                    </div>
                    <div className="tinder__content-user-descr-distance tinder__content-user-descr-distance--full">
                        {currentUser.partnerSettings.distance}
                        <span className="tinder__content-user-distance-text">
                            km from you
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TinderFullPreview