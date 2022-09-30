import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent, useEffect, useState } from "react"
import { IUser } from "../../models/IUser"
import InterestsSetting from "./SettingFields/IterestsSetting"

interface ProfileSettingPropsInterface {
    currentUser: IUser
    setIsUserInfoSetting: (isSetting: boolean) => void
    submitSettings: (inputName: string, changedData: string | number, innerObjectName?: string) => void
    formName: string
    settingInputName: string
    innerObjectName: string
    setInnerObjectName: (innerObjectName: string) => void
}

const ProfileSetting: React.FC<ProfileSettingPropsInterface> = ({currentUser, setIsUserInfoSetting, submitSettings, formName, settingInputName, innerObjectName, setInnerObjectName}) => {
    const [inputValue, setInputValue] = useState('')
    const [inputValueDirty, setInputValueDirty] = useState(false)
    const [inputValueError, setInputValueError] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)
    const [isFormCloseable, setIsFormCloseable] = useState(true)

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!re.test(String(e.target.value).toLowerCase())) {
            setInputValueError('Incorrect email')
        } else {
            setInputValueError('')
        }
    }

    const checkInput = (event: ChangeEvent<HTMLInputElement>, formName: string, limit: {min: number, max: number}) => {
        if(event.target.value.length < limit.min || event.target.value.length > limit.max) {
            setInputValueError(`${formName} has to be more 2 and less 15`)
        if(!event.target.value) {
            setInputValueError(`${formName} can't be empty`)
        }
        } else{
            setInputValueError('')
        }
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        if(settingInputName === 'email') {
            emailHandler(e)
        }

        if(settingInputName !== 'email' && settingInputName !== 'place') {
            checkInput(e, formName, {min: 2, max: 15})
        }
        if(settingInputName === 'place') {
            checkInput(e, formName, {min: 8, max: 25})
        }
    }

    useEffect(() => {
        if(inputValueError) {
          setIsFormValid(false)
        } else {
          setIsFormValid(true)
        }
    }, [inputValueError])

    useEffect(() => {
        if((settingInputName === 'preferSex' && innerObjectName === 'partnerSettings') || (settingInputName === 'sex' && innerObjectName === '')) {
            if(!inputValue) {
                setIsFormValid(false)
                setIsFormCloseable(false)
                setInputValueError('Form can\'t be empty')
            } else {
                setIsFormValid(true)
                setIsFormCloseable(true)
                setInputValueError('')
            }
        }
    }, [settingInputName, innerObjectName, inputValue])

    useEffect(() => { //@ts-ignore
        setInputValue(innerObjectName ? currentUser[innerObjectName][settingInputName] : currentUser[settingInputName])
    }, [innerObjectName, currentUser, settingInputName, setInnerObjectName])

    const cancelHandler = () => {
        setInnerObjectName('')
        setIsUserInfoSetting(false)
    }

    if(settingInputName === 'interests') {
        return <InterestsSetting currentUser={currentUser} isFormValid={isFormValid} isFormCloseable={isFormCloseable} submitSettings={submitSettings} cancelHandler={cancelHandler}/>
    }
    
    return (
        <div className="tinder__content-setting">
            {inputValueDirty &&
                <div className="tinder__content-setting-name tinder__content-setting-name--error">
                    {inputValueError}
                </div>
            }
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

                    <input 
                        onChange={(e) => inputHandler(e)} 
                        onBlur={(() => setInputValueDirty(true))} 
                        value={inputValue} 
                        type="text" 
                        className="tinder__content-setting-change-input"
                    />
                }
            </div>
            <div className="tinder__content-setting-descr">Your {formName}</div>
            <button disabled={!isFormCloseable} onClick={() => cancelHandler()} className="tinder__content-setting-submit-button tinder__content-setting-submit-button--no-border-bottom">
                Cancel
            </button>
            <button disabled={!isFormValid} onClick={() => submitSettings(settingInputName, inputValue, innerObjectName)} className="tinder__content-setting-submit-button">
                Update my {formName}
            </button>
        </div>
    )
}

export default ProfileSetting