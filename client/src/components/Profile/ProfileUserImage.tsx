import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { IUser } from "../../models/IUser"

interface ProfileUserImagePropsInterface{
    currentUser: IUser
}

const ProfileUserImage: React.FC<ProfileUserImagePropsInterface> = ({currentUser}) => {
    return(
        <div className="tinder__content-search tinder__content-search--profile">
            <div className="tinder__content-search-photo tinder__content-search-photo--profile">
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
                    <div className="tinder__content-change-info">
                        <Link to="edit">
                            <span className="tinder__content-change-info-text">Edit Info</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUserImage