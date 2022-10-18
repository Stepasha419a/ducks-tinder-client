import { ChangeEvent } from "react"

interface DescriptionSettingProps {
    submitSettings: (inputName: string, changedData: string | number | boolean | string[] | {from: number, to: number}, innerObjectName?: string) => void
    inputValueDirty: boolean
    inputValueError: string
    inputHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    setInputValueDirty: (setting: boolean) => void
    inputValue: string
    isFormCloseable: boolean
    cancelHandler: () => void
    isFormValid: boolean
}

const DescriptionSetting: React.FC<DescriptionSettingProps> = ({ submitSettings, inputValueDirty, inputValueError, inputHandler, setInputValueDirty, inputValue, isFormCloseable, cancelHandler, isFormValid }) => {
    return (
        <div className="content__setting">
            {inputValueDirty &&
                <div className="content__setting-name content__setting-name--error">
                    {inputValueError}
                </div>
            }
            <div className="content__setting-name">
                Description
            </div>
            <div className="content__setting-change">
                <textarea 
                    onChange={(e) => inputHandler(e)} 
                    onBlur={(() => setInputValueDirty(true))} 
                    value={inputValue} 
                    className="content__setting-change-input content__setting-change-textarea"
                />
            </div>
            <div className="content__setting-descr">Your description</div>
            <button disabled={!isFormCloseable} onClick={() => cancelHandler()} className="content__setting-submit-button content__setting-submit-button--no-border-bottom">
                Cancel
            </button>
            <button disabled={!isFormValid} onClick={() => submitSettings('description', inputValue)} className="content__setting-submit-button">
                Update my description
            </button>
        </div>
    )
}

export default DescriptionSetting