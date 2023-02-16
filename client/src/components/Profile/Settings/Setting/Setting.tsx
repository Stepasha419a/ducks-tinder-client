import { ChangeEvent, useEffect, useState } from 'react';
import { IUser } from '../../../../models/IUser';
import DescriptionSetting from './SettingFields/Description/DescriptionSetting';
import InterestsSetting from './SettingFields/Interests/IterestsSetting';
import styles from './Setting.module.scss';
import { Button, RadioInput, TextField } from '../../../ui';

interface ProfileSettingPropsInterface {
  currentUser: IUser;
  setIsUserInfoSetting: (isSetting: boolean) => void;
  submitSettings: (
    inputName: string,
    changedData:
      | string
      | number
      | boolean
      | string[]
      | { from: number; to: number },
    innerObjectName?: string
  ) => void;
  formName: string;
  settingInputName: string;
  innerObjectName: string;
  setInnerObjectName: (innerObjectName: string) => void;
}

const ProfileSetting: React.FC<ProfileSettingPropsInterface> = ({
  currentUser,
  setIsUserInfoSetting,
  submitSettings,
  formName,
  settingInputName,
  innerObjectName,
  setInnerObjectName,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputValueDirty, setInputValueDirty] = useState(false);
  const [inputValueError, setInputValueError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormCloseable, setIsFormCloseable] = useState(true);

  const emailHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setInputValueError('Incorrect email');
    } else {
      setInputValueError('');
    }
  };

  const checkInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    formName: string,
    limit: { min: number; max: number }
  ) => {
    if (
      event.target.value.length < limit.min ||
      event.target.value.length > limit.max
    ) {
      setInputValueError(
        `${formName} has to be more ${limit.min} and less ${limit.max}`
      );
      if (!event.target.value) {
        setInputValueError(`${formName} can't be empty`);
      }
    } else {
      setInputValueError('');
    }
  };

  const inputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
    if (settingInputName === 'email') {
      emailHandler(e);
    }

    if (settingInputName !== 'email' && settingInputName !== 'place') {
      checkInput(e, formName, { min: 2, max: 15 });
    }
    if (settingInputName === 'place') {
      checkInput(e, formName, { min: 8, max: 25 });
    }
    if (settingInputName === 'description') {
      checkInput(e, formName, { min: 20, max: 400 });
    }
  };

  useEffect(() => {
    if (inputValueError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [inputValueError]);

  useEffect(() => {
    if (
      (settingInputName === 'preferSex' &&
        innerObjectName === 'partnerSettings') ||
      (settingInputName === 'sex' && innerObjectName === '')
    ) {
      if (!inputValue) {
        setIsFormValid(false);
        setIsFormCloseable(false);
        setInputValueError("Form can't be empty");
      } else {
        setIsFormValid(true);
        setIsFormCloseable(true);
        setInputValueError('');
      }
    }
  }, [settingInputName, innerObjectName, inputValue]);

  useEffect(() => {
    setInputValue(
      innerObjectName //@ts-ignore
        ? currentUser[innerObjectName][settingInputName] //@ts-ignore
        : currentUser[settingInputName]
    );
  }, [innerObjectName, currentUser, settingInputName, setInnerObjectName]);

  const cancelHandler = () => {
    setInnerObjectName('');
    setIsUserInfoSetting(false);
  };

  if (settingInputName === 'interests') {
    return (
      <InterestsSetting
        currentUser={currentUser}
        isFormValid={isFormValid}
        isFormCloseable={isFormCloseable}
        submitSettings={submitSettings}
        cancelHandler={cancelHandler}
      />
    );
  } else if (settingInputName === 'description') {
    return (
      <DescriptionSetting
        inputValueDirty={inputValueDirty}
        inputValueError={inputValueError}
        inputHandler={inputHandler}
        setInputValueDirty={setInputValueDirty}
        inputValue={inputValue}
        isFormValid={isFormValid}
        isFormCloseable={isFormCloseable}
        submitSettings={submitSettings}
        cancelHandler={cancelHandler}
      />
    );
  }

  return (
    <div className={styles.setting}>
      {inputValueDirty && inputValueError && (
        <div className={`${styles.name} ${styles.name_error}`}>
          {inputValueError}
        </div>
      )}
      <div className={styles.name}>{formName}</div>
      <div className={styles.content}>
        {(settingInputName === 'preferSex' &&
          innerObjectName === 'partnerSettings') ||
        (settingInputName === 'sex' && innerObjectName === '') ? (
          <div>
            <RadioInput
              name={settingInputName}
              value="male"
              checked={inputValue === 'male'}
              onChange={() => setInputValue('male')}
              text="Male"
              extraClassName={styles.radioInput}
            />
            <RadioInput
              name={settingInputName}
              value="female"
              checked={inputValue === 'female'}
              onChange={() => setInputValue('female')}
              text="Female"
              extraClassName={styles.radioInput}
            />
          </div>
        ) : (
          <TextField
            onChange={(e) => inputHandler(e)}
            onBlur={() => setInputValueDirty(true)}
            value={inputValue}
            type="text"
            extraClassName={styles.textInput}
          />
        )}
      </div>
      <div className={styles.title}>Your {formName}</div>
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
        onClick={() =>
          submitSettings(settingInputName, inputValue, innerObjectName)
        }
        variant="setting"
      >
        Update my {formName}
      </Button>
    </div>
  );
};

export default ProfileSetting;
