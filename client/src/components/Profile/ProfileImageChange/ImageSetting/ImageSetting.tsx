import { useState } from "react"
import { IUser } from "../../../../models/IUser"
import ProfileChangeImage from "../ChangeImage/ChangeImage"
import ProfileFullPreview from "../Preview/FullPreview/FullPreview"
import ProfilePreview from "../Preview/Preview"
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
                    <button onClick={() => setIsPreviewSetting(false)} className={`${styles.btn} ${styles.btn_border} ${!isPreviewSetting ? styles.btn_active : ''}`}>Change</button>
                    <button onClick={() => setIsPreviewSetting(true)} className={`${styles.btn}  ${isPreviewSetting ? styles.btn_active : ''}`}>Preview</button>
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