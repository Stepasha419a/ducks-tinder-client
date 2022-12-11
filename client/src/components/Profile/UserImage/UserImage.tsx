import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IUser } from "../../../models/IUser"
import ImageSlider from "../../Slider/ImageSlider/ImageSlider"
import styles from './UserImage.module.scss'

interface UserImagePropsInterface{
    currentUser: IUser
    setIsImageSetting: (isImageSetting: boolean) => void
}

const UserImage: React.FC<UserImagePropsInterface> = ({currentUser, setIsImageSetting}) => {
    return(
        <>
            <div className={styles.slider}>
                <ImageSlider images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id}/>
            </div>
            <div className={styles.info}>
                <div className={styles.descr}>
                    <div className={styles.name}>
                        {currentUser.name}
                        <span className={styles.years}>
                            {currentUser.age}
                        </span>
                    </div>
                    <div className={styles.sex}>
                        <FontAwesomeIcon icon={faUser}  className={styles.icon}/>
                        {currentUser.sex}
                    </div>
                </div>
                <hr className={styles.separator}/>
                <div className={styles.edit}>
                    <button onClick={() => setIsImageSetting(true)} className={styles.btn}>
                        <span className={styles.text}>Edit Info</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserImage