import { faAngleRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import InputRange from "react-input-range"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { IUser } from "../../models/IUser"
import { logoutThunk } from "../../redux/authReducer"

interface ProfileSettingsListPropsInterface{
    currentUser: IUser
    setIsUserInfoSetting: (isSetting: boolean) => void
    currentDistanceSetting: number
    setCurrentDistanceSetting: (currentDistanceSetting: number) => void
    currentAgeSetting: number
    setCurrentAgeSetting: (currentAgeSetting: number) => void
    submitSettings: (inputName: string, changedData: string | number | boolean | {from: number, to: number}, innerObjectName?: string) => void
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
    
    const [ageSetting, setAgeSetting] = useState(currentUser.partnerSettings ? 
        {min: currentUser.partnerSettings.age.from, max: currentUser.partnerSettings.age.to}
        :
        {min: 18, max: 24}
        )

    const setSettingInput = (formName: string, inputName: string, innerObjectName?: string) => {
        setIsUserInfoSetting(true)
        setFormName(formName)
        setSettingInputName(inputName)
        innerObjectName && setInnerObjectName(innerObjectName)
    }

    return(
        <div className="tinder__settings-groups">
            <div className="tinder__settings-group">
                <div className="tinder__settings-group-title">
                    Account Settings
                </div>
                <div className="tinder__settings-group-items">
                    <div onClick={() => setSettingInput('Email', 'email')} className="tinder__settings-group-item tinder__settings-group-item--pointer">
                        <div className="tinder__settings-group-item-descr">
                            <div className="tinder__settings-group-item-descr-title">
                                Email
                            </div>
                            <div className="tinder__settings-group-item-descr-setting">
                                {currentUser.email}
                                <FontAwesomeIcon icon={faAngleRight} className="tinder__settings-group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSettingInput('Name', 'name')} className="tinder__settings-group-item tinder__settings-group-item--pointer">
                        <div className="tinder__settings-group-item-descr">
                            <div className="tinder__settings-group-item-descr-title">
                                Name
                            </div>
                            <div className="tinder__settings-group-item-descr-setting">
                                {currentUser.name}
                                <FontAwesomeIcon icon={faAngleRight} className="tinder__settings-group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSettingInput('Sex', 'sex')} className="tinder__settings-group-item tinder__settings-group-item--pointer">
                        <div className="tinder__settings-group-item-descr">
                            <div className="tinder__settings-group-item-descr-title">
                                Sex
                            </div>
                            <div className="tinder__settings-group-item-descr-setting">
                                {currentUser.sex || 'unknown'}
                                <FontAwesomeIcon icon={faAngleRight} className="tinder__settings-group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="tinder__settings-group-item">
                        <div className="tinder__settings-group-item-descr">
                            <div className="tinder__settings-group-item-descr-title">
                                Age
                            </div>
                            <div className="tinder__settings-group-item-descr-setting">
                                {currentAgeSetting || 'unknown'} years old
                            </div>
                        </div>
                        <div className="tinder__settings-group-item-setting">
                            <div className="tinder__settings-group-item-setting-change-slider">
                                <InputRange
                                    step={1}
                                    draggableTrack={false}
                                    allowSameValues={false}
                                    minValue={18}
                                    maxValue={100}
                                    value={currentAgeSetting}
                                    onChange={age => setCurrentAgeSetting(age as number)}
                                    onChangeComplete={() => submitSettings('age', currentAgeSetting)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tinder__settings-group-descr">
                    Verified email adress helps to protect your account
                </div>
            </div>
            <div className="tinder__settings-group">
                <div className="tinder__settings-group-title">
                    Find Settings
                </div>
                <div className="tinder__settings-group-items">
                    <div onClick={() => setSettingInput('Place', 'place', 'partnerSettings')} className="tinder__settings-group-item tinder__settings-group-item--pointer">
                        <div className="tinder__settings-group-item-descr">
                            <div className="tinder__settings-group-item-descr-title">
                                Place
                            </div>
                            <div className="tinder__settings-group-item-descr-setting">
                                {currentUser.partnerSettings ? currentUser.partnerSettings.place : 'unknown'}
                                <FontAwesomeIcon icon={faAngleRight} className="tinder__settings-group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="tinder__settings-group-item">
                        <div className="tinder__settings-group-item-descr">
                            <div className="tinder__settings-group-item-descr-title">
                                Distance
                            </div>
                            <div className="tinder__settings-group-item-descr-setting">
                                {currentDistanceSetting || 'unknown'} км.
                            </div>
                        </div>
                        <div className="tinder__settings-group-item-setting">
                            <div className="tinder__settings-group-item-setting-change-slider">
                                <InputRange
                                    step={1}
                                    draggableTrack={false}
                                    allowSameValues={false}
                                    minValue={18}
                                    maxValue={100}
                                    value={currentDistanceSetting}
                                    onChange={dist => setCurrentDistanceSetting(dist as number)}
                                    onChangeComplete={() => submitSettings('distance', currentDistanceSetting, 'partnerSettings')}
                                />
                            </div>
                            <div className="tinder__settings-group-item-setting-descr tinder__settings-group-item-setting-descr--relative">
                                Show people only in this range

                                <label className="tinder__settings-group-item-setting-checkbox">
                                    <input 
                                        checked={currentUser.partnerSettings.usersOnlyInDistance}
                                        onChange={(e) => submitSettings('usersOnlyInDistance', e.target.checked, 'partnerSettings')} 
                                        type="checkbox" 
                                        className="tinder__settings-group-item-setting-checkbox-input"
                                    />
                                    <div className="tinder__settings-group-item-setting-checkbox-div">

                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setSettingInput('Interested in', 'preferSex', 'partnerSettings')} className="tinder__settings-group-item tinder__settings-group-item--pointer">
                        <div className="tinder__settings-group-item-descr">
                            <div className="tinder__settings-group-item-descr-title">
                                Interested in
                            </div>
                            <div className="tinder__settings-group-item-descr-setting">
                                {currentUser.partnerSettings ? currentUser.partnerSettings.preferSex : 'unknown'}
                                <FontAwesomeIcon icon={faAngleRight} className="tinder__settings-group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="tinder__settings-group-item">
                        <div className="tinder__settings-group-item-descr">
                            <div className="tinder__settings-group-item-descr-title">
                                Partner age
                            </div>
                            <div className="tinder__settings-group-item-descr-setting">
                                from {ageSetting.min} to {ageSetting.max}
                            </div>
                        </div>
                        <div className="tinder__settings-group-item-setting">
                            <div className="tinder__settings-group-item-setting-change-slider">
                                <InputRange
                                    step={1}
                                    draggableTrack={false}
                                    allowSameValues={false}
                                    minValue={18}
                                    maxValue={100}
                                    value={ageSetting}
                                    onChange={setAgeSetting as any}
                                    onChangeComplete={() => submitSettings('age', {from: ageSetting.min, to: ageSetting.max}, 'partnerSettings' )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tinder__settings-group-descr">
                    When the local profiles are over, you will be able to 
                    switch to the Global Mode for dating people from all over the world.
                </div>
            </div>
            <div className="tinder__settings-group">
                <div className="tinder__settings-group-title">
                    Internet account
                </div>
                <div className="tinder__settings-group-items">
                    <div onClick={() => setSettingInput('Nickname', 'nickname')} className="tinder__settings-group-item tinder__settings-group-item--pointer">
                        <div className="tinder__settings-group-item-descr">
                            <div className="tinder__settings-group-item-descr-title">
                                Nickname
                            </div>
                            <div className="tinder__settings-group-item-descr-setting">
                                {currentUser.nickname || 'unknown'}
                                <FontAwesomeIcon icon={faAngleRight} className="tinder__settings-group-item-descr-setting-open-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tinder__settings-group-descr">
                    Create a username, share it and start searching for couples on Tinder around the world.
                </div>
            </div>
            <div className="tinder__settings-group">
                <div className="tinder__settings-group-title">
                    Safety Tips
                </div>
                <div className="tinder__settings-group-items">
                    <div className="tinder__settings-group-item tinder__settings-group-item--link">
                        <Link to="/policy" className="tinder__settings-group-item-link" target="_blank" >
                            <div className="tinder__settings-group-item-descr">
                                <div className="tinder__settings-group-item-descr-title tinder__settings-group-item-descr-title--link">
                                    Community Rules
                                </div>
                                <div className="tinder__settings-group-item-descr-setting">
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="tinder__settings-group-item-descr-setting-icon" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="tinder__settings-group-item tinder__settings-group-item--link">
                        <Link to="/policy" className="tinder__settings-group-item-link" target="_blank" >
                            <div className="tinder__settings-group-item-descr">
                                <div className="tinder__settings-group-item-descr-title tinder__settings-group-item-descr-title--link">
                                    Security and Policy Development Center
                                </div>
                                <div className="tinder__settings-group-item-descr-setting">
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="tinder__settings-group-item-descr-setting-icon" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="tinder__settings-group-item tinder__settings-group-item--link">
                        <Link to="/policy" className="tinder__settings-group-item-link" target="_blank" >
                            <div className="tinder__settings-group-item-descr">
                                <div className="tinder__settings-group-item-descr-title tinder__settings-group-item-descr-title--link">
                                    Safety Tips
                                </div>
                                <div className="tinder__settings-group-item-descr-setting">
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="tinder__settings-group-item-descr-setting-icon" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="tinder__settings-group">
                <div className="tinder__settings-group-items">
                    <div onClick={() => dispatch(logoutThunk() as any)} className="tinder__settings-group-item tinder__settings-group-item--sumple-button">
                        <div className="tinder__settings-group-item-descr">
                            <div className="tinder__settings-group-item-descr-title tinder__settings-group-item-descr-title--center">
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