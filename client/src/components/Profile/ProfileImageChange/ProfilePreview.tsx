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
        <div className="content__preview">
            
            <div className="content__preview-inner">
                <ImageSlider  images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id} imageExtraClassName={'image__slider-item--bdrd'}/>
                <div className="content__preview-info">
                    <div className="content__preview-info-name">
                        {currentUser.name} 
                    </div>
                    <div className="content__preview-info-years">
                        {currentUser.age || 'unknown years'}
                    </div>
                </div>
                <button onClick={() => setIsFullPreviewPageSetting(true)} className="content__preview-full">
                    <FontAwesomeIcon icon={faCircleInfo} />
                </button>
            </div>
        </div>
    )
}

export default ProfilePreview