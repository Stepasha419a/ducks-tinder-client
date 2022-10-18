import { useState } from "react"
import { IUser } from "../../../models/IUser"
import ProfileChangeImage from "./ProfileChangeImage"
import ProfileFullPreview from "./ProfileFullPreview"
import ProfilePreview from "./ProfilePreview"

interface ProfileImageSettingPropsInterface{
    setIsImageSetting: (isImageSetting: boolean) => void
    currentUser: IUser
}

const ProfileImageSetting: React.FC<ProfileImageSettingPropsInterface> = ({setIsImageSetting, currentUser}) => {
    const [isPreviewSetting, setIsPreviewSetting] = useState(false)
    const [isFullPreviewPageSetting, setIsFullPreviewPageSetting] = useState(false)

    return(
        <div className="content__change">
            {isFullPreviewPageSetting ?
                <ProfileFullPreview currentUser={currentUser} setIsFullPreviewPageSetting={setIsFullPreviewPageSetting}/>
            :
            <>
                <div className="content__change-btns">
                    <button onClick={() => setIsPreviewSetting(false)} className={`content__change-button content__change-button--border ${!isPreviewSetting ? 'content__change-button--active' : ''}`}>Change</button>
                    <button onClick={() => setIsPreviewSetting(true)} className={`content__change-button  ${isPreviewSetting ? 'content__change-button--active' : ''}`}>Preview</button>
                </div>
                <div className="content__change-panel">
                    {isPreviewSetting ?
                        <ProfilePreview currentUser={currentUser} setIsFullPreviewPageSetting={setIsFullPreviewPageSetting}/>
                    :
                        <ProfileChangeImage currentUser={currentUser} setIsImageSetting={setIsImageSetting}/>
                    }
                </div>
            </>
            }
        </div>
    )
}

export default ProfileImageSetting