import { faCircleDown, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IUser } from "../../../models/IUser"
import ImageSlider from "../../Slider/ImageSlider"

interface ProfileFullPreviewPropsInterface{
    currentUser: IUser
    setIsFullPreviewPageSetting: (setting: boolean) => void
}

const ProfileFullPreview: React.FC<ProfileFullPreviewPropsInterface> = ({currentUser, setIsFullPreviewPageSetting}) => {
    return(
        <div className="content__full-preview">
            <div className="content__full-preview-slider">
                <ImageSlider  images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id} imageExtraClassName={'image__slider-item--bdrd-top'}/>
                <button onClick={() => setIsFullPreviewPageSetting(false)} className="content__full-preview-close">
                    <FontAwesomeIcon icon={faCircleDown} className="content__full-preview-close-icon"/>
                </button>
            </div>
            <div className="content__full-preview-info">
                <div className="content__full-preview-info-flex">
                    <div className="content__full-preview-info-name">
                        {currentUser.name}
                    </div>
                    <div className="content__full-preview-info-years">
                        {currentUser.age || 'unkown years'}
                    </div>
                </div>
                <div className="content__full-preview-info-sex">
                    <FontAwesomeIcon icon={faUser} className="content__full-preview-info-sex-icon"/>
                    {currentUser.sex ? currentUser.sex[0].toUpperCase() + currentUser.sex.slice(1) : 'unkown sex'}
                </div>
            </div>
            <hr className="content__info-separator"/>
        </div>
    )
}

export default ProfileFullPreview