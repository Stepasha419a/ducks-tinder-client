import { ChangeEvent } from "react"
import styles from './DescriptionSetting.module.scss'

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
        <div className={styles.setting}>
            {inputValueDirty &&
                <div className={`${styles.name} ${styles.name_error}`}>
                    {inputValueError}
                </div>
            }
            <div className={styles.name}>
                Description
            </div>
            <div className={styles.wrapper}>
                <textarea 
                    onChange={(e) => inputHandler(e)} 
                    onBlur={(() => setInputValueDirty(true))} 
                    value={inputValue} 
                    className={`${styles.input} ${styles.textarea}`}
                />
            </div>
            <div className={styles.title}>Your description</div>
            <button disabled={!isFormCloseable} onClick={() => cancelHandler()} className={`${styles.submit} ${styles.submit_boBorder}`}>
                Cancel
            </button>
            <button disabled={!isFormValid} onClick={() => submitSettings('description', inputValue)} className={styles.submit}>
                Update my description
            </button>
        </div>
    )
}

export default DescriptionSetting