import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { Setting } from './Setting/Setting';
import { SettingsList } from './SettingsList/SettingsList';
import { createNotification } from '@entities/notification/model';

// TODO: relocate add error field logic into Profile path
export const ProfileBlock = (): ReactElement => {
  const dispatch = useAppDispatch();

  const isUserInfoSetting = useAppSelector(
    (state) => state.setting.isUserInfoSetting
  );
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  useEffect(() => {
    const errorText =
      'You have some empty fields, they are selected with red color';
    const result = notifications.find((item) => item.text === errorText);
    if (!result && errorFields.length) {
      dispatch(createNotification({ type: 'error', text: errorText }));
    } // eslint-disable-next-line
  }, [errorFields.length, dispatch]);

  return isUserInfoSetting ? <Setting /> : <SettingsList />;
};
