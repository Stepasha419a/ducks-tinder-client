import { faCircleInfo, faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons"
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
                
                <div className="content__preview-info content__user-info content__info-setting">
                    <div className="content__user-descr content__user-descr--full">
                        <div className="content__user-descr-person content__user-descr-person--margin">
                            {currentUser.name} <span className="content__user-descr-years">{currentUser.age}</span>
                        </div>
                        <div className="content__user-descr-place content__user-descr-person--margin">
                            <FontAwesomeIcon icon={faHouse} className="content__user-descr-place-icon"/>
                            <div className="content__user-descr-place-text">
                                Lives in {currentUser.partnerSettings.place}
                            </div>
                        </div>
                        <div className="content__user-descr-distance content__user-descr-person--margin">
                            <FontAwesomeIcon icon={faLocationDot} className="content__user-descr-distance-icon"/>
                            {currentUser.partnerSettings.distance}
                            <span className="content__user-distance-text">
                                km from you
                            </span>
                        </div>
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