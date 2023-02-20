import { useEffect, useState } from 'react';
import { IUser, PartnerSettings, potentialFields } from '../../../models/IUser';
import { createNotification } from '../../../redux/notifications/notifications.slice';
import {
  IUserInnerKey,
  setInnerObjectName,
  setInputName,
  setIsUserInfoSetting,
  setValidation,
  Validation,
} from '../../../redux/settings/settings.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { checkField } from '../utils/ProfileUtils';
import Account from './SettingGroups/Account/Account';
import Find from './SettingGroups/Find/Find';
import LinksSettingGroup from './SettingGroups/Links/LinksSettingGroup';
import LoggoutButton from './SettingGroups/LogoutButton/LogoutButton';
import Nickname from './SettingGroups/Nickname/Nickname';
import styles from './SettingsList.module.scss';

interface SettingsListPropsInterface {
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
  setFormName: (formName: string) => void;
}

const SettingsList: React.FC<SettingsListPropsInterface> = ({
  submitSettings,
  setFormName,
}) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
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
    validation?: Validation | null,
    innerObjectName?: string
  ) => {
    dispatch(setIsUserInfoSetting(true));
    setFormName(formName);
    dispatch(setValidation(validation));
    dispatch(setInputName(inputName as keyof IUser | keyof PartnerSettings));
    innerObjectName &&
      dispatch(setInnerObjectName(innerObjectName as 'partnerSettings'));
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
