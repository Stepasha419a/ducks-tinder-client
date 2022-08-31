import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IUser } from "../../models/IUser"
import ImageSlider from "../Slider/ImageSlider"

interface ProfileUserImagePropsInterface{
    currentUser: IUser
    setIsImageSetting: (isImageSetting: boolean) => void
}

const ProfileUserImage: React.FC<ProfileUserImagePropsInterface> = ({currentUser, setIsImageSetting}) => {
    return(
        <>
            <div className="tinder__content-slider">
                <ImageSlider images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id}/>
            </div>
            <div className="tinder__content-info tinder__content-info--profile">
                <div className="tinder__content-info-descr">
                    <div className="tinder__content-info-descr-name">
                        {currentUser.name}
                        <span className="tinder__content-info-descr-years">
                            {currentUser.age}
                        </span>
                    </div>
                    <div className="tinder__content-info-descr-sex">
                        <FontAwesomeIcon icon={faUser}  className="tinder__content-info-descr-sex-icon"/>
                        {currentUser.sex}
                    </div>
                </div>
                <hr className="tinder__content-info-separator"/>
                <div className="tinder__content-change-info-wrapper">
                    <button onClick={() => setIsImageSetting(true)} className="tinder__content-change-info">
                        <span className="tinder__content-change-info-text">Edit Info</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfileUserImage