import { Dispatch, PropsWithChildren, SetStateAction, useEffect } from 'react';
import {
  ChangablePartnerSettingsFields,
  ChangableUserFields,
} from '../../../../../redux/settings/settings.interfaces';
import { setIsUserInfoSetting } from '../../../../../redux/settings/settings.slice';
import { submitSettingsThunk } from '../../../../../redux/settings/settings.thunks';
import { useAppDispatch, useAppSelector } from '../../../../../redux/store';
import { Button } from '../../../../ui';
import styles from './SettingWrapper.module.scss';

interface SettingWrapperProps {
  formName: string | null;
  inputValueDirty: boolean;
  inputValueError: string;
  isFormCloseable: boolean;
  inputValue: string | string[];
  setInputValue: Dispatch<SetStateAction<string | string[]>>;
}

const SettingWrapper: React.FC<PropsWithChildren<SettingWrapperProps>> = ({
  formName,
  children,
  inputValueDirty,
  inputValueError,
  isFormCloseable,
  inputValue,
  setInputValue,
}) => {
  const dispatch = useAppDispatch();
  const cancelHandler = () => {
    dispatch(setIsUserInfoSetting(false));
  };

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const innerObjectName = useAppSelector(
    (state) => state.settings.innerObjectName
  );
  const settingInputName = useAppSelector(
    (state) => state.settings.settingInputName
  );

  useEffect(() => {
    setInputValue(
      innerObjectName
        ? currentUser[innerObjectName][
            settingInputName as ChangablePartnerSettingsFields
          ]
        : currentUser[settingInputName as ChangableUserFields]
    );
  }, [innerObjectName, currentUser, settingInputName, setInputValue]);

  const submitSettings = () => {
    dispatch(submitSettingsThunk({ changedData: inputValue }));
  };

  return (
    <div className={styles.setting}>
      {inputValueDirty && inputValueError && (
        <div className={`${styles.name} ${styles.name_error}`}>
          {inputValueError}
        </div>
      )}
      <div className={styles.name}>{formName}</div>
      <div className={styles.content}>{children}</div>
      <div className={styles.title}>Your {formName}</div>
      <Button
        disabled={!isFormCloseable}
        onClick={cancelHandler}
        variant="setting"
        extraClassName={styles.noBorder}
      >
        Cancel
      </Button>
      <Button
        disabled={!!(inputValueDirty && inputValueError)}
        onClick={submitSettings}
        variant="setting"
      >
        Update my {formName}
      </Button>
    </div>
  );
};

export default SettingWrapper;
