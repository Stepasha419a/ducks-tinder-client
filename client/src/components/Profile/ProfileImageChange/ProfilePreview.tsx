import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IUser } from "../../../models/IUser"
import ImageSlider from "../../Slider/ImageSlider"

interface ProfilePreviewPropsInterface{
    currentUser: IUser
    setIsFullPreviewPageSetting: (setting: boolean) => void
}

const ProfilePreview: React.FC<ProfilePreviewPropsInterface> = ({currentUser, setIsFullPreviewPageSetting}) => {
    return(
        <div className="tinder__content-preview">
            
            <div className="tinder__content-preview-inner">
                <ImageSlider  images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id} imageExtraClassName={'tinder__image-slider-item--bdrd'}/>
                <div className="tinder__content-preview-info">
                    <div className="tinder__content-preview-info-name">
                        {currentUser.name} 
                    </div>
                    <div className="tinder__content-preview-info-years">
                        {currentUser.age || 'unknown years'}
                    </div>
                </div>
                <button onClick={() => setIsFullPreviewPageSetting(true)} className="tinder__content-preview-full">
                    <FontAwesomeIcon icon={faCircleInfo} />
                </button>
            </div>
        </div>
    )
}

export default ProfilePreview