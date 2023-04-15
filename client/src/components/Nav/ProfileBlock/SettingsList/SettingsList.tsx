import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import type { Validation } from '@shared/interfaces';
import type {
  ChangedData,
  InnerObjectName,
  SettingInputName,
} from '@shared/api/interfaces';
import { createNotification } from '@entities/notification/model';
import { setInput } from '@entities/setting/model';
import { submitSettingsThunk } from '@entities/setting/model';
import {
  Account,
  Find,
  LinksSettingGroup,
  LogoutButton,
  Nickname,
} from '@entities/setting/components';
import styles from './SettingsList.module.scss';

const SettingsList = (): ReactElement => {
  const dispatch = useAppDispatch();

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

  const setInputHandler = (
    inputName: SettingInputName,
    validation: Validation | null = null,
    innerObjectName: InnerObjectName = null,
    formName = ''
  ): void => {
    dispatch(
      setInput({
        inputName,
        validation,
        innerObjectName,
        formName,
      })
    );
  };

  const updateInputHandler = (
    inputName: SettingInputName,
    changedData: ChangedData,
    innerObjectName?: InnerObjectName
  ): void => {
    dispatch(
      submitSettingsThunk({
        inputName,
        changedData,
        innerObjectName,
      })
    );
  };

  return (
    <div className={styles.groups}>
      <Account
        setInputHandler={setInputHandler}
        updateInputHandler={updateInputHandler}
      />
      <Find
        setInputHandler={setInputHandler}
        updateInputHandler={updateInputHandler}
      />
      <Nickname setInputHandler={setInputHandler} />
      <LinksSettingGroup />
      <LogoutButton />
    </div>
  );
};

export default SettingsList;
