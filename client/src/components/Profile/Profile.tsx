import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faMagnifyingGlass, faFireFlameCurved } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { AppStateType } from "../../redux/reduxStore"
import { deleteNotification, updateUserThunk } from "../../redux/usersReducer"
import ProfileUserImage from "./UserImage/UserImage"
import ProfileSettingsList from "./Settings/SettingsList"
import ProfileSetting from "./Settings/Setting/Setting"
import ProfileImageSetting from "./ProfileImageChange/ImageSetting/ImageSetting"

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
        <div className="tinder">
            <aside className="info info__-gray">
                <div className="info__user">
                    <Link className="info__main-link" to='/'>
                        <FontAwesomeIcon icon={faFireFlameCurved}/>
                    </Link>
                    <div className="info__review">
                        <Link className="info__review-link" to='#'>
                            <FontAwesomeIcon icon={faBriefcase} />
                        </Link>
                    </div>
                    <div className="info__work-mode">
                        <Link className="info__work-mode-link" to='#'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Link>
                    </div>
                </div>
                {isUserInfoSetting ? 
                    <ProfileSetting
                        currentUser={currentUser}
                        setIsUserInfoSetting={setIsUserInfoSetting}
                        submitSettings={submitSettings}
                        formName={formName}
                        settingInputName={settingInputName}
                        innerObjectName={innerObjectName}
                        setInnerObjectName={setInnerObjectName}
                    />
                :
                    <ProfileSettingsList 
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
            <div className="content">
                <div className="content__user content__user--profile">
                {isImageSetting ?
                    <ProfileImageSetting 
                        setIsImageSetting={setIsImageSetting}
                        currentUser={currentUser}
                    />
                :
                    <ProfileUserImage 
                        currentUser={currentUser}
                        setIsImageSetting={setIsImageSetting}
                    />
                }
                </div>
            </div>
            {notifications.length ? 
            <div className='notifications'>
                {notifications.map(item => {
                    return(
                        <div onClick={() => closeNotification(item.id)} key={item.id} className={`notification${item.type === 'error' ? ' notification--error' : ''}`}>
                            {item.text}
                            <div className={`notification__mark${item.type === 'error' ? ' notification__mark--error' : ''}`}></div>
                            <div className="notification__close">click to close</div>
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