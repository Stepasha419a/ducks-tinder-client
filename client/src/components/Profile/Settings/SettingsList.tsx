import { useEffect, useState } from 'react';
import { potentialFields } from '../../../models/IUser';
import { createNotification } from '../../../redux/notifications/notifications.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { checkField } from '../utils/ProfileUtils';
import Account from './SettingGroups/Account/Account';
import Find from './SettingGroups/Find/Find';
import LinksSettingGroup from './SettingGroups/Links/LinksSettingGroup';
import LoggoutButton from './SettingGroups/LogoutButton/LogoutButton';
import Nickname from './SettingGroups/Nickname/Nickname';
import styles from './SettingsList.module.scss';

interface SettingsListPropsInterface {
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
  setFormName: (formName: string) => void;
  setSettingInputName: (inputName: string) => void;
  setInnerObjectName: (innerObjectName: string) => void;
}

const SettingsList: React.FC<SettingsListPropsInterface> = ({
  setIsUserInfoSetting,
  submitSettings,
  setFormName,
  setSettingInputName,
  setInnerObjectName,
}) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(
    (state) => state.usersPage.currentUser
  );
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );

  const [errorFields, setErrorFields] = useState<string[]>([]);

  useEffect(() => {
    const newErrorFields = [];

    for (let i = 0; i < potentialFields.length; i++) {
      const field = potentialFields[i];

      let result = checkField(currentUser, field);

      if (result) {
        newErrorFields.push(field);
      }
    }

    if (newErrorFields.length) {
      setErrorFields(newErrorFields);
    } else {
      setErrorFields([]);
    }
  }, [currentUser]);

  useEffect(() => {
    const errorText =
      'You have some empty fields, they are selected with red color';
    const result = notifications.find((item) => item.text === errorText);
    if (!result && errorFields.length) {
      dispatch(createNotification({ type: 'error', text: errorText }));
    } // eslint-disable-next-line
  }, [errorFields.length, dispatch]);

  const setSettingInput = (
    formName: string,
    inputName: string,
    innerObjectName?: string
  ) => {
    setIsUserInfoSetting(true);
    setFormName(formName);
    setSettingInputName(inputName);
    innerObjectName && setInnerObjectName(innerObjectName);
  };

  return (
    <div className={styles.groups}>
      <Account
        errorFields={errorFields}
        setSettingInput={setSettingInput}
        submitSettings={submitSettings}
      />
      <Find
        errorFields={errorFields}
        setSettingInput={setSettingInput}
        submitSettings={submitSettings}
      />
      <Nickname setSettingInput={setSettingInput} />
      <LinksSettingGroup />
      <LoggoutButton />
    </div>
  );
};

export default SettingsList;