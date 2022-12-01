import { faAngleRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { IUser, potentialFields } from "../../models/IUser"
import { logoutThunk } from "../../redux/authReducer"
import { AppStateType } from "../../redux/reduxStore"
import { createNotification } from "../../redux/usersReducer"
import RangeSlider from "../Slider/RangeSlider/RangeSlider"
import { checkField } from "./utils/ProfileUtils"

interface ProfileSettingsListPropsInterface{
    currentUser: IUser
    setIsUserInfoSetting: (isSetting: boolean) => void
    currentDistanceSetting: number
    setCurrentDistanceSetting: (currentDistanceSetting: number) => void
    currentAgeSetting: number
    setCurrentAgeSetting: (currentAgeSetting: number) => void
    submitSettings: (inputName: string, changedData: string | number | boolean | string[] | {from: number, to: number}, innerObjectName?: string) => void
    setFormName: (formName: string) => void
    setSettingInputName: (inputName: string) => void
    setInnerObjectName: (innerObjectName: string) => void
}

const ProfileSettingsList: React.FC<ProfileSettingsListPropsInterface> = ({
        currentUser, 
        setIsUserInfoSetting, 
        currentDistanceSetting, 
        setCurrentDistanceSetting,
        currentAgeSetting,
        setCurrentAgeSetting,
        submitSettings,
        setFormName,
        setSettingInputName, 
        setInnerObjectName
    }) => {

    const dispatch = useDispatch()

    const notifications = useSelector((state: AppStateType) => state.usersPage.notifications)
    
    const [ageSetting, setAgeSetting] = useState<{min: number, max: number}>(currentUser.partnerSettings ? 
        {min: currentUser.partnerSettings.age.from, max: currentUser.partnerSettings.age.to}
        :
        {min: 18, max: 24}
    )
    const [errorFields, setErrorFields] = useState<string[]>([])
 
    useEffect(() => {
        const newErrorFields = []

        for (let i = 0; i < potentialFields.length; i++) {
            const field = potentialFields[i]
            
            let result = checkField(currentUser, field)

            if(result) {
                newErrorFields.push(field)
            }
        }
        
        if(newErrorFields.length) {
            setErrorFields(newErrorFields)
        } else {
            setErrorFields([])
        }
    }, [currentUser, dispatch])

    useEffect(() => {
        const errorText = "You have some empty fields, there are selected with red color"
        const result = notifications.find(item => item.text === errorText)
        if(!result && errorFields.length) {
            dispatch(createNotification({type: 'error', text: errorText}))
        } // eslint-disable-next-line
    }, [errorFields.length, dispatch])

    const setSettingInput = (formName: string, inputName: string, innerObjectName?: string) => {
        setIsUserInfoSetting(true)
        setFormName(formName)
        setSettingInputName(inputName)
        innerObjectName && setInnerObjectName(innerObjectName)
    }

    const ageHandler = () => {
        submitSettings('age', currentAgeSetting)
    }

    const distanceHandler = () => {
        submitSettings('distance', currentDistanceSetting, 'partnerSettings')
    }

    const partnerAgeHandler = () => {
        submitSettings('age', {from: ageSetting.min, to: ageSetting.max}, 'partnerSettings' )
    }

    return(
        <div className="settings__groups">
            <div className="settings__group">
                <div className="settings__group-title">
                    Account Settings
                </div>
                <div className="settings__group-items">
                    <div onClick={() => setSettingInput('Email', 'email')} className="settings__group-item settings__group-item--pointer">
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title">
                                Email
                            </div>
                            <div className="settings__group-item-descr-setting">
                                {currentUser.email}
                                <FontAwesomeIcon icon={faAngleRight} className="settings__group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSettingInput('Name', 'name')} className="settings__group-item settings__group-item--pointer">
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title">
                                Name
                            </div>
                            <div className="settings__group-item-descr-setting">
                                {currentUser.name}
                                <FontAwesomeIcon icon={faAngleRight} className="settings__group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSettingInput('Description', 'description')} className={`settings__group-item settings__group-item--pointer${errorFields.includes('description') ? ' settings__group-item--error' : ''}`}>
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title">
                                Description
                            </div>
                            <div className="settings__group-item-descr-setting settings__group-item-descr-setting--text-overflow">
                                {currentUser.description || "Empty description"}
                                <FontAwesomeIcon icon={faAngleRight} className="settings__group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSettingInput('Sex', 'sex')} className={`settings__group-item settings__group-item--pointer${errorFields.includes('sex') ? ' settings__group-item--error' : ''}`}>
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title">
                                Sex
                            </div>
                            <div className="settings__group-item-descr-setting">
                                {currentUser.sex || 'Empty sex'}
                                <FontAwesomeIcon icon={faAngleRight} className="settings__group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="settings__group-item">
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title">
                                Age
                            </div>
                            <div className="settings__group-item-descr-setting">
                                {currentAgeSetting} years old
                            </div>
                        </div>
                        <div className="settings__group-item-setting">
                            <div className="settings__group-item-setting-change-slider">
                                <RangeSlider 
                                    value={currentAgeSetting} 
                                    setValue={setCurrentAgeSetting as any} 
                                    completeValue={ageHandler as any} 
                                    min={18} 
                                    max={100} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="settings__group-descr">
                    Verified email adress helps to protect your account
                </div>
            </div>
            <div className="settings__group">
                <div className="settings__group-title">
                    Find Settings
                </div>
                <div className="settings__group-items">
                    <div onClick={() => setSettingInput('Interests', 'interests')} className={`settings__group-item settings__group-item--pointer${errorFields.includes('interests') ? ' settings__group-item--error' : ''}`}>
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title">
                                Interests
                            </div>
                            <div className="settings__group-item-descr-setting">
                            {!currentUser.interests.length ? "Empty interests" : `${currentUser.interests[0]} and so on...`}
                                <FontAwesomeIcon icon={faAngleRight} className="settings__group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSettingInput('Place', 'place', 'partnerSettings')} className={`settings__group-item settings__group-item--pointer${errorFields.includes('place') ? ' settings__group-item--error' : ''}`}>
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title">
                                Place
                            </div>
                            <div className="settings__group-item-descr-setting">
                                {currentUser.partnerSettings.place || 'Empty place'}
                                <FontAwesomeIcon icon={faAngleRight} className="settings__group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div className={`settings__group-item${errorFields.includes('distance') ? ' settings__group-item--error' : ''}`}>
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title">
                                Distance
                            </div>
                            <div className="settings__group-item-descr-setting">
                                {currentDistanceSetting || 'Empty distance'} км.
                            </div>
                        </div>
                        <div className="settings__group-item-setting">
                            <div className="settings__group-item-setting-change-slider">
                                <RangeSlider 
                                    value={currentDistanceSetting} 
                                    setValue={setCurrentDistanceSetting as any} 
                                    completeValue={distanceHandler as any} 
                                    min={2} 
                                    max={100} 
                                />
                            </div>
                            <div className="settings__group-item-setting-descr settings__group-item-setting-descr--relative">
                                Show people only in this range

                                <label className="settings__group-item-setting-checkbox">
                                    <input 
                                        checked={currentUser.partnerSettings.usersOnlyInDistance}
                                        onChange={(e) => submitSettings('usersOnlyInDistance', e.target.checked, 'partnerSettings')} 
                                        type="checkbox" 
                                        className="settings__group-item-setting-checkbox-input"
                                    />
                                    <div className="settings__group-item-setting-checkbox-div">

                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSettingInput('Interested in', 'preferSex', 'partnerSettings')} className={`settings__group-item settings__group-item--pointer${errorFields.includes('preferSex') ? ' settings__group-item--error' : ''}`}>
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title">
                                Interested in
                            </div>
                            <div className="settings__group-item-descr-setting">
                                {currentUser.partnerSettings.preferSex || 'empty sex prefer'}
                                <FontAwesomeIcon icon={faAngleRight} className="settings__group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="settings__group-item">
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title">
                                Partner age
                            </div>
                            <div className="settings__group-item-descr-setting">
                                from {ageSetting.min} to {ageSetting.max}
                            </div>
                        </div>
                        <div className="settings__group-item-setting">
                            <div className="settings__group-item-setting-change-slider">
                                <RangeSlider 
                                    value={ageSetting} 
                                    setValue={setAgeSetting as any} 
                                    completeValue={partnerAgeHandler as any} 
                                    min={18} 
                                    max={100}
                                    isMultiple 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="settings__group-descr">
                    When the local profiles are over, you will be able to 
                    switch to the Global Mode for dating people from all over the world.
                </div>
            </div>
            <div className="settings__group">
                <div className="settings__group-title">
                    Internet account
                </div>
                <div className="settings__group-items">
                    <div onClick={() => setSettingInput('Nickname', 'nickname')} className="settings__group-item settings__group-item--pointer">
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title">
                                Nickname
                            </div>
                            <div className="settings__group-item-descr-setting">
                                {currentUser.nickname || 'unknown'}
                                <FontAwesomeIcon icon={faAngleRight} className="settings__group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="settings__group-descr">
                    Create a username, share it and start searching for couples on Tinder around the world.
                </div>
            </div>
            <div className="settings__group">
                <div className="settings__group-title">
                    Safety Tips
                </div>
                <div className="settings__group-items">
                    <div className="settings__group-item settings__group-item--link">
                        <Link to="/policy" className="settings__group-item-link" target="_blank" >
                            <div className="settings__group-item-descr">
                                <div className="settings__group-item-descr-title settings__group-item-descr-title--link">
                                    Community Rules
                                </div>
                                <div className="settings__group-item-descr-setting">
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="settings__group-item-descr-setting-icon" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="settings__group-item settings__group-item--link">
                        <Link to="/policy" className="settings__group-item-link" target="_blank" >
                            <div className="settings__group-item-descr">
                                <div className="settings__group-item-descr-title settings__group-item-descr-title--link">
                                    Security and Policy Development Center
                                </div>
                                <div className="settings__group-item-descr-setting">
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="settings__group-item-descr-setting-icon" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="settings__group-item settings__group-item--link">
                        <Link to="/policy" className="settings__group-item-link" target="_blank" >
                            <div className="settings__group-item-descr">
                                <div className="settings__group-item-descr-title settings__group-item-descr-title--link">
                                    Safety Tips
                                </div>
                                <div className="settings__group-item-descr-setting">
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="settings__group-item-descr-setting-icon" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="settings__group">
                <div className="settings__group-items">
                    <div onClick={() => dispatch(logoutThunk() as any)} className="settings__group-item settings__group-item--sumple-button">
                        <div className="settings__group-item-descr">
                            <div className="settings__group-item-descr-title settings__group-item-descr-title--center">
                                Log out
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettingsList