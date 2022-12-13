import { faCircleInfo, faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IUser } from "../../../../../models/IUser"
import ImageSlider from "../../../../Slider/ImageSlider/ImageSlider"
import styles from './Preview.module.scss'

interface ProfilePreviewPropsInterface{
    currentUser: IUser
    setIsFullPreviewPageSetting: (setting: boolean) => void
}

const ProfilePreview: React.FC<ProfilePreviewPropsInterface> = ({currentUser, setIsFullPreviewPageSetting}) => {
    return(
        <div className={styles.preview}>
            <div className={styles.inner}>
                <ImageSlider  images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id} imageExtraClassName={'_bdrd'}/>
                <div className={styles.info}>
                    <div className={styles.descr}>
                        <div className={styles.person}>
                            {currentUser.name} <span className={styles.years}>{currentUser.age}</span>
                        </div>
                        <div className={styles.place}>
                            <FontAwesomeIcon icon={faHouse} className={styles.icon}/>
                            <div>
                                Lives in {currentUser.partnerSettings.place}
                            </div>
                        </div>
                        <div className={styles.distance}>
                            <FontAwesomeIcon icon={faLocationDot} className={styles.icon}/>
                            {currentUser.partnerSettings.distance}
                            <span className={styles.text}>
                                km from you
                            </span>
                        </div>
                    </div>
                </div>
                <button onClick={() => setIsFullPreviewPageSetting(true)} className={styles.openFullPreview}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                </button>
            </div>
        </div>
    )
}

export default ProfilePreview