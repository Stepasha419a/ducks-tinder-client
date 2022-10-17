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
            <div className="content-slider">
                <ImageSlider images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id}/>
            </div>
            <div className="content-info content-info--profile">
                <div className="content-info-descr">
                    <div className="content-info-descr-name">
                        {currentUser.name}
                        <span className="content-info-descr-years">
                            {currentUser.age}
                        </span>
                    </div>
                    <div className="content-info-descr-sex">
                        <FontAwesomeIcon icon={faUser}  className="content-info-descr-sex-icon"/>
                        {currentUser.sex}
                    </div>
                </div>
                <hr className="content-info-separator"/>
                <div className="content-change-info-wrapper">
                    <button onClick={() => setIsImageSetting(true)} className="content-change-info">
                        <span className="content-change-info-text">Edit Info</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfileUserImage