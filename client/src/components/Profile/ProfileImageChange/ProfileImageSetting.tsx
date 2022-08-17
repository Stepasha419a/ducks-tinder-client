import { useState } from "react"
import ProfileChangeImage from "./ProfileChangeImage"
import ProfilePreview from "./ProfilePreview"

interface ProfileImageSettingPropsInterface{
    setIsImageSetting: (isImageSetting: boolean) => void
}

const ProfileImageSetting: React.FC<ProfileImageSettingPropsInterface> = ({setIsImageSetting}) => {
    const [isPreviewSetting, setIsPreviewSetting] = useState(false)

    return(
        <div className="tinder__content-change">
            <div className="tinder__content-change-btns">
                <button onClick={() => setIsPreviewSetting(false)} className={`tinder__content-change-button tinder__content-change-button--border ${!isPreviewSetting ? 'tinder__content-change-button--active' : ''}`}>Change</button>
                <button onClick={() => setIsPreviewSetting(true)} className={`tinder__content-change-button  ${isPreviewSetting ? 'tinder__content-change-button--active' : ''}`}>Preview</button>
            </div>
            <div className="tinder__content-change-panel">
                {isPreviewSetting ?
                    <ProfilePreview />
                :
                    <ProfileChangeImage setIsImageSetting={setIsImageSetting}/>
                }
            </div>
        </div>
    )
}

export default ProfileImageSetting