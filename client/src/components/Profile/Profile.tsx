import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faMagnifyingGlass, faFireFlameCurved } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { AppStateType } from "../../redux/reduxStore"
import { deleteNotification, updateUserThunk } from "../../redux/usersReducer"
import UserImage from "./UserImage/UserImage"
import SettingsList from "./Settings/SettingsList"
import Setting from "./Settings/Setting/Setting"
import ImageSetting from "./ProfileImageChange/ImageSetting/ImageSetting"
import styles from './Profile.module.scss'

const Profile = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const notifications = useSelector((state: AppStateType) => state.usersPage.notifications)

    const [currentDistanceSetting, setCurrentDistanceSetting] = useState(currentUser.partnerSettings ? currentUser.partnerSettings.distance : 5)
    const [currentAgeSetting, setCurrentAgeSetting] = useState(currentUser.age ? currentUser.age : 18)
    const [isUserInfoSetting, setIsUserInfoSetting] = useState(false)
    const [isImageSetting, setIsImageSetting] = useState(false)
    const [formName, setFormName] = useState('') // name of the title in ProfileSetting
    const [settingInputName, setSettingInputName] = useState('')
    const [innerObjectName, setInnerObjectName] = useState('')


    // objectName for inner object in user object if it is
    const submitSettings = (inputName: string, changedData: string | number | boolean | string[] | {from: number, to: number}, innerObjectName?: string) => { 
        dispatch(updateUserThunk({currentUser, inputName, changedData, innerObjectName}) as any)
        setIsUserInfoSetting(false)
        setInnerObjectName('')
    }

    const closeNotification = (id: number) => {
        dispatch(deleteNotification(id))
    }

    return (
        <div className={styles.profile}>
            <aside className={styles.info}>
                <div className={styles.links}>
                    <Link className={styles.mainLink} to='/'>
                        <FontAwesomeIcon icon={faFireFlameCurved}/>
                    </Link>
                    <div className={styles.review}>
                        <Link className={styles.link} to='#'>
                            <FontAwesomeIcon icon={faBriefcase} />
                        </Link>
                    </div>
                    <div className={styles.work}>
                        <Link className={styles.link} to='#'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Link>
                    </div>
                </div>
                {isUserInfoSetting ? 
                    <Setting
                        currentUser={currentUser}
                        setIsUserInfoSetting={setIsUserInfoSetting}
                        submitSettings={submitSettings}
                        formName={formName}
                        settingInputName={settingInputName}
                        innerObjectName={innerObjectName}
                        setInnerObjectName={setInnerObjectName}
                    />
                :
                    <SettingsList 
                        currentUser={currentUser}
                        setIsUserInfoSetting={setIsUserInfoSetting}
                        currentDistanceSetting={currentDistanceSetting}
                        setCurrentDistanceSetting={setCurrentDistanceSetting}
                        currentAgeSetting={currentAgeSetting}
                        setCurrentAgeSetting={setCurrentAgeSetting}
                        submitSettings={submitSettings}
                        setFormName={setFormName}
                        setSettingInputName={setSettingInputName}
                        setInnerObjectName={setInnerObjectName}
                    />
                }
            </aside>
            <div className={styles.content}>
                <div className={styles.user}>
                {isImageSetting ?
                    <ImageSetting 
                        setIsImageSetting={setIsImageSetting}
                        currentUser={currentUser}
                    />
                :
                    <UserImage 
                        currentUser={currentUser}
                        setIsImageSetting={setIsImageSetting}
                    />
                }
                </div>
            </div>
            {notifications.length ? 
            <div className={styles.notifications}>
                {notifications.map(item => {
                    return(
                        <div onClick={() => closeNotification(item.id)} key={item.id} className={`${styles.notification} ${item.type === 'error' ? styles.notification_error : ''}`}>
                            {item.text}
                            <div className={`${styles.mark} ${item.type === 'error' ? styles.mark_error : ''}`}></div>
                            <div className={styles.close}>click to close</div>
                        </div>
                    )
                })
                }
            </div>
            : null
            }
        </div>
    )
}

export default Profile