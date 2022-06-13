import { useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import profilePhoto from '../../assets/images/profile/1.png'
import { IUser } from "../../models/IUser"
import { Link } from "react-router-dom"
import photo from '../../assets/images/photos/2.jpg'

const Profile = () => {

    const user = useSelector((state: AppStateType) => state.authPage.user as IUser )

    let photoStyle = {
        backgroundImage: `url(${photo})`
    }

    return (
    <div className="App Profile">
        <div className="info-box">
            <div className="profile-info">
                <Link to="/">
                    <div className="profile-photo">
                        <img src={profilePhoto} alt="" className="photo" />
                    </div>
                </Link>
            </div>

            <div className="socials">
            </div>
        </div>
        <div className="search">
            <div className="window">
                <div className="photo">
                    <div style={photoStyle}></div>
                </div>
                <div className="control-panel">
                    <div className="control-panel-container">
                        <div className="user-info">
                            <h1 className="name">{user.name}</h1>
                            <span className="age">21</span>
                        </div>
                        <div className="sex">Male</div>
                    </div>
                    <hr />
                    <div className="edit-info">
                        <Link to="edit">
                            <span>Edit info</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Profile