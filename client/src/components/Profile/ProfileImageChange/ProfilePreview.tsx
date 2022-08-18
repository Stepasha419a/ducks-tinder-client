import { IUser } from "../../../models/IUser"

interface ProfilePreviewPropsInterface{
    currentUser: IUser
}

const ProfilePreview: React.FC<ProfilePreviewPropsInterface> = ({currentUser}) => {
    return(
        <div className="tinder__content-preview">
            <div className="tinder__content-preview-photo">
                <div className="tinder__content-preview-info">
                    <div className="tinder__content-preview-info-name">
                        {currentUser.name} 
                    </div>
                    <div className="tinder__content-preview-info-years">
                        {currentUser.age || 'unknown'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePreview