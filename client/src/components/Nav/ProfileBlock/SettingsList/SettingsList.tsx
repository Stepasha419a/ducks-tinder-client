import { useEffect } from 'react';
import { createNotification } from '../../../../redux/notifications/notifications.slice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import {
  Account,
  Find,
  LinksSettingGroup,
  LoggoutButton,
  Nickname,
} from './settingGroups';
import styles from './SettingsList.module.scss';

const SettingsList = () => {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );
  const errorFields = useAppSelector((state) => state.settings.errorFields);

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
      <Account />
      <Find />
      <Nickname />
      <LinksSettingGroup />
      <LoggoutButton />
    </div>
  );
};

export default SettingsList;
