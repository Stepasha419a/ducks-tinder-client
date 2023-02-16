import { useState } from "react"
import { IUser } from "../../../../models/IUser"
import { Button } from "../../../ui"
import ProfileChangeImage from "../ChangeImage/ChangeImage"
import ProfileFullPreview from "../UserPreview/FullPreview/FullPreview"
import ProfilePreview from "../UserPreview/Preview/Preview"
import styles from './ImageSetting.module.scss'

interface ProfileImageSettingPropsInterface{
    setIsImageSetting: (isImageSetting: boolean) => void
    currentUser: IUser
}

const ProfileImageSetting: React.FC<ProfileImageSettingPropsInterface> = ({setIsImageSetting, currentUser}) => {
    const [isPreviewSetting, setIsPreviewSetting] = useState(false)
    const [isFullPreviewPageSetting, setIsFullPreviewPageSetting] = useState(false)

    return(
        <div className={styles.change}>
            {isFullPreviewPageSetting ?
                <ProfileFullPreview currentUser={currentUser} setIsFullPreviewPageSetting={setIsFullPreviewPageSetting}/>
            :
            <>
                <div className={styles.btns}>
                    <Button variant="default" onClick={() => setIsPreviewSetting(false)} extraClassName={[(!isPreviewSetting ? styles.active : ''), styles.border]}>Change</Button>
                    <Button variant="default" onClick={() => setIsPreviewSetting(true)} extraClassName={isPreviewSetting ? styles.active : ''}>Preview</Button>
                </div>
                <div className={styles.panel}>
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