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

const SettingsList = () => {
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

  return (
    <div className={styles.groups}>
      <Account errorFields={errorFields} />
      <Find errorFields={errorFields} />
      <Nickname />
      <LinksSettingGroup />
      <LoggoutButton />
    </div>
  );
};

export default SettingsList;
