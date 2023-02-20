import { ChangeEvent } from 'react';
import { IUser, PartnerSettings } from '../../../../../../models/IUser';
import { IUserInnerKey } from '../../../../../../redux/settings/settings.slice';
import { Button } from '../../../../../ui';
import styles from './TextArea.module.scss';

interface TextAreaProps {
  submitSettings: (
    inputName: keyof IUser | keyof PartnerSettings,
    changedData:
      | string
      | number
      | boolean
      | string[]
      | { from: number; to: number },
    innerObjectName?: IUserInnerKey
  ) => void;
  inputValueDirty: boolean;
  inputValueError: string;
  inputHandler: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setInputValueDirty: (setting: boolean) => void;
  inputValue: string;
  isFormCloseable: boolean;
  cancelHandler: () => void;
  isFormValid: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  submitSettings,
  inputValueDirty,
  inputValueError,
  inputHandler,
  setInputValueDirty,
  inputValue,
  isFormCloseable,
  cancelHandler,
  isFormValid,
}) => {
  return (
    <div className={styles.setting}>
      {inputValueDirty && inputValueError && (
        <div className={`${styles.name} ${styles.name_error}`}>
          {inputValueError}
        </div>
      )}
      <div className={styles.name}>Description</div>
      <div className={styles.wrapper}>
        <textarea
          onChange={(e) => inputHandler(e)}
          onBlur={() => setInputValueDirty(true)}
          value={inputValue}
          className={`${styles.input} ${styles.textarea}`}
        />
      </div>
      <div className={styles.title}>Your description</div>
      <Button
        disabled={!isFormCloseable}
        onClick={() => cancelHandler()}
        variant="setting"
        extraClassName={styles.noBorder}
      >
        Cancel
      </Button>
      <Button
        disabled={!isFormValid}
        onClick={() => submitSettings('description', inputValue)}
        variant="setting"
      >
        Update my description
      </Button>
    </div>
  );
};

export default TextArea;
