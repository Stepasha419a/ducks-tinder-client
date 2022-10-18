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
            <div className="content__slider">
                <ImageSlider images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id}/>
            </div>
            <div className="content__info content__info--profile">
                <div className="content__info-descr">
                    <div className="content__info-descr-name">
                        {currentUser.name}
                        <span className="content__info-descr-years">
                            {currentUser.age}
                        </span>
                    </div>
                    <div className="content__info-descr-sex">
                        <FontAwesomeIcon icon={faUser}  className="content__info-descr-sex-icon"/>
                        {currentUser.sex}
                    </div>
                </div>
                <hr className="content__info-separator"/>
                <div className="content__change-info-wrapper">
                    <button onClick={() => setIsImageSetting(true)} className="content__change-info">
                        <span className="content__change-info-text">Edit Info</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfileUserImage