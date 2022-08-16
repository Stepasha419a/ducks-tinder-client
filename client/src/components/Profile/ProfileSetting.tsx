import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { IUser } from "../../models/IUser"

interface ProfileSettingPropsInterface {
    currentUser: IUser
    setIsUserInfoSetting: (isSetting: boolean) => void
    submitSettings: (inputName: string, changedData: string | number, innerObjectName?: string) => void
    formName: string
    settingInputName: string
    innerObjectName: string
    setInnerObjectName: (innerObjectName: string) => void
}
// When u call innerObjectName input so currentUser[settingInputName] after that is not available, maybe because of useState startment argument
const ProfileSetting: React.FC<ProfileSettingPropsInterface> = ({currentUser, setIsUserInfoSetting, submitSettings, formName, settingInputName, innerObjectName, setInnerObjectName}) => {
    const [inputValue, setInputValue] = useState('')

    useEffect(() => { //@ts-ignore
        setInputValue(innerObjectName ? currentUser[innerObjectName][settingInputName] : currentUser[settingInputName])
    }, [innerObjectName, currentUser, settingInputName, setInnerObjectName])

    const cancelHandler = () => {
        setInnerObjectName('')
        setIsUserInfoSetting(false)
    }
    
    return (
        <div className="tinder__content-setting">
            <div className="tinder__content-setting-name">
                {formName}
            </div>
            <div className="tinder__content-setting-change">
                {(settingInputName === 'preferSex' && innerObjectName === 'partnerSettings') || (settingInputName === 'sex' && innerObjectName === '') ?

                    <div>
                        <div onClick={() => setInputValue('male')} className={"tinder__content-setting-change-input-wrapper " + (inputValue === 'male' ? "tinder__content-setting-change-input-wrapper--active" : "") }>
                            <input name={settingInputName} type="radio" value="male" id={settingInputName + '1'} checked={inputValue === 'male'} className="tinder__content-setting-change-input-radio"/>
                            <label htmlFor={settingInputName + '1'}>
                                Male
                            </label>
                            {inputValue === 'male' &&
                            <FontAwesomeIcon icon={faCheck} className="tinder__content-setting-change-checked"/>}
                        </div>
                        <div onClick={() => setInputValue('female')} className={"tinder__content-setting-change-input-wrapper " + (inputValue === 'female' ? "tinder__content-setting-change-input-wrapper--active" : "") }>
                            <input name={settingInputName} type="radio" value="female"  id={settingInputName + '2'} checked={inputValue === 'female'} className="tinder__content-setting-change-input-radio"/>
                            <label htmlFor={settingInputName + '2'}>
                                Female
                            </label>
                            {inputValue === 'female' &&
                            <FontAwesomeIcon icon={faCheck} className="tinder__content-setting-change-checked"/>}
                        </div>
                    </div>

                :

                    <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} type="text" className="tinder__content-setting-change-input"/>
                }
            </div>
            <div className="tinder__content-setting-descr">Your {formName}</div>
            <button onClick={() => cancelHandler()} className="tinder__content-setting-submit-button tinder__content-setting-submit-button--margin-bottom">
                Cancel
            </button>
            <button onClick={() => submitSettings(settingInputName, inputValue, innerObjectName)} className="tinder__content-setting-submit-button">
                Update my {formName}
            </button>
        </div>
    )
}

export default ProfileSetting